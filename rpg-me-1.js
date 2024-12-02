/**
 * Copyright 2024 ade5239
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import { WiredButton, WiredInput } from "wired-elements";
import 'wired-elements/lib/wired-slider.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-combo.js';
import 'wired-elements/lib/wired-item.js';

/**
 * `rpg-me-1`
 * 
 * @demo index.html
 * @element rpg-me-1
 */
export class RpgMe1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-me-1";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-me-1.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-potential0);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: flex;
        flex-direction: row;
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .left-panel {
        flex: 1;
        margin-right: var(--ddd-spacing-4);
        background-color: var(--left-panel-background-color, var(--ddd-theme-primary));
        color: var(--ddd-theme-accent);
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-md);
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
      }
      .right-panel {
        flex: 1;
        background-color: var(--right-panel-background-color, var(--ddd-theme-accent));
        color: var(--ddd-theme-primary);
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-md);
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
      }
      .input-field {
        margin-bottom: var(--ddd-spacing-4);
        color: black;
      }
      label {
        display: block;
        margin-bottom: var(--ddd-spacing-1);
        font-size: var(--ddd-font-size-s));
      }
      .seed {
        margin-top: var(--ddd-spacing-4);
        font-weight: bold;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <div class="left-panel">
          <rpg-character></rpg-character>
          <div class="seed">Seed: [Generated Seed]</div>
        </div>
        <div class="right-panel">
          <div class="input-field">
            <label for="accessories">Accessories</label>
            <wired-slider
              id="accessories"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="base">Base</label>
            <wired-slider
              id="base"
              min="1"
              max="5"
              step="4"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="face">Face</label>
            <wired-slider
              id="face"
              min="0"
              max="5"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="faceitem">Face Item</label>
            <wired-slider
              id="faceitem"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="hair">Hair</label>
            <wired-slider
              id="hair"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="pants">Pants</label>
            <wired-slider
              id="pants"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="shirt">Shirt</label>
            <wired-slider
              id="shirt"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="skin">Skin</label>
            <wired-slider
              id="skin"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="hatcolor">Hat Color</label>
            <wired-slider
              id="hatcolor"
              min="0"
              max="9"
              step="1"
            ></wired-slider>
          </div>
          <div class="input-field">
            <label for="hat">Hat</label>
            <wired-combo id="hat">
              <wired-item value="none">None</wired-item>
              <wired-item value="bunny">Bunny</wired-item>
              <wired-item value="coffee">Coffee</wired-item>
              <wired-item value="construction">Construction</wired-item>
              <wired-item value="cowboy">Cowboy</wired-item>
              <wired-item value="education">Education</wired-item>
              <wired-item value="knight">Knight</wired-item>
              <wired-item value="ninja">Ninja</wired-item>
              <wired-item value="party">Party</wired-item>
              <wired-item value="pirate">Pirate</wired-item>
              <wired-item value="watermelon">Watermelon</wired-item>
            </wired-combo>
          </div>
          <div class="input-field">
            <wired-checkbox id="fire">On Fire</wired-checkbox>
          </div>
          <div class="input-field">
            <wired-checkbox id="walking">Walking</wired-checkbox>
          </div>
          <div class="input-field">
            <wired-checkbox id="circle">Circle</wired-checkbox>
          </div>
          <div class="input-field">
            <wired-button id="share-button">Share</wired-button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgMe1.tag, RpgMe1);
