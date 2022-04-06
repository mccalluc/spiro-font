export default function getInit({defaults, url}) {
  const overrides = Object.fromEntries(
    Array.from(
      new URL(url).searchParams.entries()
    )
  );

  const {segments = '{}', segmentMap = '{}'} = overrides;
  const initSegments = {...defaults.segments, ...JSON.parse(segments)};
  const initSegmentMap = {...defaults.segmentMap, ...JSON.parse(segmentMap)};
  delete overrides.segments;
  delete overrides.segmentMap;

  const numericOverrides = Object.fromEntries(
    Object.entries(overrides).map(([k, v]) => [k, Number(v)])
  );

  return {
    ...defaults, ...numericOverrides,
    segments: initSegments,
    segmentMap: initSegmentMap
  }
}