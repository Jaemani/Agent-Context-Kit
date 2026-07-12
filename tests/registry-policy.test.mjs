import assert from "node:assert/strict";
import test from "node:test";
import { assertBetaDistTags, BOOTSTRAP_LATEST_VERSION } from "../scripts/lib/registry-policy.mjs";

test("beta registry policy accepts the current beta with a fixed bootstrap latest", () => {
  assert.doesNotThrow(() =>
    assertBetaDistTags(
      {
        beta: "0.1.0-beta.5",
        latest: BOOTSTRAP_LATEST_VERSION,
        canary: "0.1.0-beta.6",
      },
      "0.1.0-beta.5",
    ),
  );
});

test("beta registry policy rejects a stale or missing beta tag", () => {
  assert.throws(
    () =>
      assertBetaDistTags(
        { beta: "0.1.0-beta.4", latest: BOOTSTRAP_LATEST_VERSION },
        "0.1.0-beta.5",
      ),
    /registry beta tag differs/u,
  );
  assert.throws(
    () => assertBetaDistTags({ latest: BOOTSTRAP_LATEST_VERSION }, "0.1.0-beta.5"),
    /registry beta tag differs/u,
  );
});

test("beta registry policy rejects latest movement or malformed tag responses", () => {
  assert.throws(
    () => assertBetaDistTags({ beta: "0.1.0-beta.5", latest: "0.1.0-beta.5" }, "0.1.0-beta.5"),
    /registry latest tag must remain fixed/u,
  );
  for (const value of [null, [], "not-an-object"]) {
    assert.throws(
      () => assertBetaDistTags(value, "0.1.0-beta.5"),
      /registry dist-tags must be an object/u,
    );
  }
});
