export const analyzeDeal = (req, res, next) => {
  try {
    const { dealName, company, amount, stage, notes } = req.body;

    if (!dealName && !company) {
      return res.status(400).json({
        success: false,
        error: { message: 'Either dealName or company is required for AI analysis' },
      });
    }

    // Simulated ambient intelligence score calculation
    const baseScore = Math.floor(75 + Math.random() * 20); // 75-94%
    const signals = [
      'Strong executive sponsorship detected in email communications',
      'Positive alignment with Q3 budgetary priorities',
      'High technical requirement match (>92% compatibility)',
      'Fast turnaround time on legal terms review',
    ];

    const risks = [
      'Incumbent vendor contract renewal pending next quarter',
      'Security questionnaire review required before procurement sign-off',
    ];

    const recommendations = [
      'Trigger custom ROI battlecard with benchmark comparisons',
      'Schedule technical architecture deep dive with Chief Architect',
      'Provide SOC2 Type II audit report to CISO team',
    ];

    res.json({
      success: true,
      analysis: {
        target: dealName || company,
        company: company || dealName,
        winProbability: `${baseScore}%`,
        sentiment: baseScore > 85 ? 'Highly Positive' : 'Favorable',
        forecastPrecision: '94%',
        telemetrySignals: signals.slice(0, 3),
        potentialRisks: [risks[Math.floor(Math.random() * risks.length)]],
        recommendedNextAction: recommendations[Math.floor(Math.random() * recommendations.length)],
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
};
