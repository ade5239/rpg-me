import { html, fixture, expect } from '@open-wc/testing';
import "../rpg-me-1.js";

describe("RpgMe1 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <rpg-me-1
        title="title"
      ></rpg-me-1>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
