# Understanding the Logarithmic Scale for AgentBench Score

## What is a Logarithmic Scale?

A logarithmic scale is a way of displaying numerical data over a wide range of values in a compact way. Unlike a linear scale where equal steps correspond to equal absolute changes, a logarithmic scale represents equal steps as equal percentage or multiplicative changes.

## Why Use a Logarithmic Scale for AI Benchmark Scores?

The AgentBench Score in our risk assessment tool uses a logarithmic scale for several important reasons:

1. **Representing Exponential Improvements**: AI capabilities often improve exponentially rather than linearly. Small numerical improvements at high benchmark scores can represent massive capability jumps.

2. **Sensitivity at Lower Ranges**: A logarithmic scale provides more granular control for lower values, where small absolute changes can significantly impact risk calculations.

3. **Reflecting Real-World AI Progress**: The development of AI capabilities often follows logarithmic patterns, where initial progress is rapid followed by diminishing returns as capabilities approach theoretical limits.

4. **Range Compression**: The logarithmic scale compresses a wide range of values (0.1 to 10.0) into a usable interface element while maintaining meaningful distinctions across the entire range.

## How to Interpret the AgentBench Score Slider

Our AgentBench Score slider ranges from 0.1 to 10.0 on a logarithmic scale:

- **Lower End (0.1-1.0)**: In this range, small movements of the slider result in small absolute changes in the score. This region represents less capable AI systems with limited agency.

- **Middle Range (1.0-5.0)**: This range represents moderate capability AI systems. The slider becomes less sensitive here, with the same slider movement resulting in larger absolute changes compared to the lower end.

- **Upper End (5.0-10.0)**: At this end of the scale, small slider movements result in significant absolute changes in the score. This represents highly capable AI systems where small benchmark improvements represent substantial capability jumps.

## Visual Indicators

The logarithmic nature of the scale is visually indicated by:

1. The "Logarithmic Scale" label below the slider
2. The "Exponential Improvement →" indicator that signals increasing returns as you move right on the slider
3. The precision in the displayed value (showing two decimal places)

## Example: Interpreting Score Changes

- **Change from 0.1 to 0.2**: A 100% increase in capability, requiring a significant slider movement
- **Change from 1.0 to 2.0**: A 100% increase in capability, requiring a moderate slider movement
- **Change from 5.0 to 10.0**: A 100% increase in capability, requiring a small slider movement

This non-linear relationship more accurately reflects how small improvements in already-capable AI systems can dramatically increase both their utility and potential risk exposure.

## Impact on Risk Calculations

The logarithmic scale has a direct impact on the derived risk parameters:

- **Number of Attacks**: Increases exponentially with higher AgentBench scores
- **Spearphishing Success**: More sensitive to changes in AgentBench at the upper end
- **Financial Severity**: Compounds with other metrics, amplifying the effect of high AgentBench scores

This approach provides a more realistic risk assessment as it better captures how incremental improvements in advanced AI models can lead to disproportionate changes in capability and associated risk.

---

*This guide is part of the AI Cybersecurity Risk Assessment Tool documentation and is intended to help users understand the significance of the logarithmic scale in assessing AI-related security risks.*