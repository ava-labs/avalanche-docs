import { describe, expect, it } from "vitest";
import { deriveEditUrlFromSourceUrl, replaceRelativeLinks } from "@/utils/remote-content/shared.mts";

const BASE = "https://raw.githubusercontent.com/avalanche-foundation/ACPs/main/README.md";

describe("replaceRelativeLinks img handling", () => {
  it("rewrites a plain html img tag to an absolute self-closing tag with no stray bracket", () => {
    const out = replaceRelativeLinks('<img width="80%" src="LOGO.png">', BASE);
    expect(out).toBe(
      '<img width="80%" src="https://raw.githubusercontent.com/avalanche-foundation/ACPs/main/LOGO.png" />',
    );
    expect(out).not.toContain(">>");
  });

  it("keeps attributes that follow src and does not double the self-closing slash", () => {
    const out = replaceRelativeLinks('<img src="x.png" alt="a logo" />', BASE);
    expect(out).toBe(
      '<img alt="a logo" src="https://raw.githubusercontent.com/avalanche-foundation/ACPs/main/x.png" />',
    );
    expect(out.match(/\/>/g)).toHaveLength(1);
  });

  it("leaves markdown links to absolute urls untouched", () => {
    const md = "[docs](https://build.avax.network/docs)";
    expect(replaceRelativeLinks(md, BASE)).toBe(md);
  });

  it("consumes a multi-line img tag whole", () => {
    const out = replaceRelativeLinks('<img\n  width="80%"\n  src="LOGO.png"\n/>', BASE);
    expect(out).toBe('<img width="80%" src="https://raw.githubusercontent.com/avalanche-foundation/ACPs/main/LOGO.png" />');
  });
});

describe("deriveEditUrlFromSourceUrl", () => {
  it("links a master source to the GitHub editor", () => {
    expect(
      deriveEditUrlFromSourceUrl("https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/avm/config.md"),
    ).toBe("https://github.com/ava-labs/avalanchego/edit/master/vms/avm/config.md");
  });

  it("links a source pinned to a commit to the file at that commit", () => {
    expect(
      deriveEditUrlFromSourceUrl("https://raw.githubusercontent.com/ava-labs/avalanchego/e9f7e75/graft/coreth/service.md"),
    ).toBe("https://github.com/ava-labs/avalanchego/blob/e9f7e75/graft/coreth/service.md");
  });
});
