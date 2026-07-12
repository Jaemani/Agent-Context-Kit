import assert from "node:assert/strict";

export const BOOTSTRAP_LATEST_VERSION = "0.1.0-beta.4";

export function assertBetaDistTags(tags, expectedBeta) {
  assert.equal(
    typeof tags === "object" && tags !== null && !Array.isArray(tags),
    true,
    "registry dist-tags must be an object",
  );
  assert.equal(tags.beta, expectedBeta, "registry beta tag differs from the release version");
  assert.equal(
    tags.latest,
    BOOTSTRAP_LATEST_VERSION,
    "registry latest tag must remain fixed at the bootstrap beta until stable",
  );
}
