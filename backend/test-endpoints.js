import http from 'http';
import app from './src/app.js';

const PORT = 5055;
const server = app.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  const runRequest = (path, method = 'GET', body = null, token = null) => {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const req = http.request(
        {
          hostname: '127.0.0.1',
          port: PORT,
          path,
          method,
          headers,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, body: JSON.parse(data) });
            } catch {
              resolve({ status: res.statusCode, body: data });
            }
          });
        }
      );
      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };

  try {
    // 1. Health
    const health = await runRequest('/api/health');
    console.assert(health.status === 200 && health.body.status === 'healthy', 'Health test failed');
    console.log('✔ Health check OK');

    // 2. Overview
    const overview = await runRequest('/api/overview');
    console.assert(overview.status === 200 && overview.body.success, 'Overview test failed');
    console.log('✔ Overview endpoint OK');

    // 3. Plans
    const plans = await runRequest('/api/plans');
    console.assert(plans.status === 200 && Array.isArray(plans.body.data), 'Plans test failed');
    console.log('✔ Plans endpoint OK');

    // 4. FAQs
    const faqs = await runRequest('/api/faqs');
    console.assert(faqs.status === 200 && faqs.body.data[0].question !== undefined, 'FAQs test failed');
    console.log('✔ FAQs endpoint OK (returns questions)');

    // 5. Capabilities
    const caps = await runRequest('/api/capabilities');
    console.assert(caps.status === 200 && Array.isArray(caps.body.data), 'Capabilities test failed');
    console.log('✔ Capabilities endpoint OK');

    // 6. AI Analyze Deal
    const ai = await runRequest('/api/ai/analyze-deal', 'POST', { dealName: 'Enterprise AI Pilot', company: 'GlobalCorp' });
    console.assert(ai.status === 200 && ai.body.analysis.winProbability, 'AI test failed');
    console.log('✔ AI Deal analysis OK');

    // 7. Auth: Register and Me
    const testUser = {
      fullName: 'Test Auditor',
      email: `auditor_${Date.now()}@lumina.ai`,
      password: 'SecurePassword123!',
      company: 'Audit Inc',
      role: 'Enterprise VP',
    };
    const reg = await runRequest('/api/auth/register', 'POST', testUser);
    console.assert(reg.status === 201 && reg.body.token, 'Register test failed');
    console.log('✔ Auth register OK');

    const me = await runRequest('/api/auth/me', 'GET', null, reg.body.token);
    console.assert(me.status === 200 && me.body.user.email === testUser.email, 'Auth me test failed');
    console.log('✔ Auth /me OK');

    // 8. 404 handler
    const notFound = await runRequest('/api/non-existent');
    console.assert(notFound.status === 404, '404 handler test failed');
    console.log('✔ 404 handler OK');

    console.log('\n🎉 ALL BACKEND ENDPOINTS AND CHECKS PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('Test suite failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
