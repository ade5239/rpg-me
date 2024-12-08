import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RpgMe1 extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me-1";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = { ...this.t, title: "Title" };
    this.registerLocalization({
      context: this,
      localesPath: new URL("./locales/rpg-me-1.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });

    this.hatList = [
      "none",
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];

    // Start sliders at min so handles appear at left
    this.accessories = 0;
    this.base = 0;
    this.leg = "";
    this.face = 0;
    this.faceItem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0;
    this.hatColor = 0;
    this.hat = this.hatList[0];
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.seed = '';
    this.linkCopied = false;
    this.hatIndex = 0;
    this.characterSize = 100;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      accessories: { type: Number },
      base: { type: Number },
      leg: { type: String },
      face: { type: Number },
      faceItem: { type: Number },
      hair: { type: Number },
      pants: { type: Number },
      shirt: { type: Number },
      skin: { type: Number },
      hatColor: { type: Number },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
      seed: { type: String },
      linkCopied: { type: Boolean },
      hatIndex: { type: Number },
      characterSize: { type: Number },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        background-color: #f9f9f9;
        color: #333;
        font-family: var(--ddd-font-navigation);
      }

      .wrapper {
        display: flex;
        flex-direction: row;
        height: 100vh;
        overflow: hidden;
        gap: 10px; /* space between panes */
        padding: 10px;
        box-sizing: border-box;
      }

      .left-panel {
        width: 50%;
        background: linear-gradient(to bottom, #e0f7fa, #fff);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-radius: var(--ddd-radius-md);
        padding: 20px;
        box-sizing: border-box;
        position: relative;
      }

      .seed {
        font-weight: bold;
        background: rgba(0,0,0,0.1);
        padding: 5px 10px;
        border-radius: var(--ddd-radius-md);
        margin-bottom: 20px;
      }

      rpg-character {
        width: var(--character-size);
        height: var(--character-size);
        border-radius: var(--ddd-radius-md);
      }

      .right-panel {
        width: 50%;
        background: #fffce7;
        color: #333;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
        border-radius: var(--ddd-radius-md);
      }

      .controls-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 0 10px;
        box-sizing: border-box;
      }

      .input-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #fff;
        padding: 10px;
        border-radius: var(--ddd-radius-md);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .input-field label {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #333;
      }

      /* Update slider events to use detail.value and rely on attribute binding */
      wired-slider {
        /* width set by media queries below */
      }

      .checkbox-field {
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .checkbox-field label {
        margin-bottom: 0;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 600;
      }

      .share-container {
        margin-top: 20px;
        text-align: center;
      }

      #copiedMessage {
        margin-top: 10px;
        background: #d1f7d1;
        padding: 5px 10px;
        border-radius: var(--ddd-radius-md);
        font-size: 13px;
      }

      @media (max-width: 800px) {
        .input-field wired-slider {
          width: 150px !important;
        }
      }

      @media (min-width: 801px) and (max-width: 1200px) {
        .input-field wired-slider {
          width: 200px !important;
        }
      }

      @media (min-width: 1201px) {
        .input-field wired-slider {
          width: 300px !important;
        }
      }

      @media (max-width: 800px) {
        .wrapper {
          flex-direction: column;
        }
        .left-panel, .right-panel {
          width: 100%;
          height: auto;
        }
        .controls-container {
          grid-template-columns: 1fr;
        }
      }
    `];
  }

  //generates seed based on current properties
  generateSeed() {
    const pad = (num) => String(num).padStart(1, '0');
    return `${pad(this.accessories)}${pad(this.base)}${pad(this.face)}${pad(this.faceItem)}${pad(this.hair)}${pad(this.pants)}${pad(this.shirt)}${pad(this.skin)}${pad(this.hatColor)}0`;
  }

  render() {
    const noHair = this.base === 0;
    return html`
      <div class="wrapper">
        <div class="left-panel" style="--character-size: ${this.characterSize}px;">
          <div class="seed">Seed: ${this.generateSeed()}</div>
          <rpg-character
            style="--character-size: ${this.characterSize}px;"
            .accessories="${this.accessories}"
            .base="${this.base}"
            .leg="${this.leg}"
            .face="${this.face}"
            .faceItem="${this.faceItem}"
            .hair="${this.hair}"
            .pants="${this.pants}"
            .shirt="${this.shirt}"
            .skin="${this.skin}"
            .hatColor="${this.hatColor}"
            .hat="${this.hat}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
          ></rpg-character>
        </div>
        <div class="right-panel">
          <div class="controls-container">
            <div class="input-field">
              <label>Character Size (${this.characterSize}px)</label>
              <wired-slider
                min="100"
                max="600"
                step="10"
                value="${this.characterSize}"
                @change="${e => this.updateChar('characterSize', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Accessories (0-9)</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.accessories}"
                @change="${e => this.updateChar('accessories', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Base (0=No Hair, 1=Hair)</label>
              <wired-slider
                min="0"
                max="1"
                step="1"
                value="${this.base}"
                @change="${e => this.updateChar('base', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Face (0-5)</label>
              <wired-slider
                min="0"
                max="5"
                step="1"
                value="${this.face}"
                @change="${e => this.updateChar('face', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Face Item (0-9)</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.faceItem}"
                @change="${e => this.updateChar('faceItem', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Hair (0-9) ${noHair ? '(No Hair Option)' : ''}</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.hair}"
                ?disabled="${noHair}"
                @change="${e => !noHair && this.updateChar('hair', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Pants (0-9)</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.pants}"
                @change="${e => this.updateChar('pants', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Shirt (0-9)</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.shirt}"
                @change="${e => this.updateChar('shirt', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Skin (0-9)</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.skin}"
                @change="${e => this.updateChar('skin', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Hat (current: ${this.hat})</label>
              <wired-slider
                min="0"
                max="${this.hatList.length - 1}"
                step="1"
                value="${this.hatIndex}"
                @change="${e => this.updateChar('hatIndex', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field">
              <label>Hat Color (0-9)</label>
              <wired-slider
                min="0"
                max="9"
                step="1"
                value="${this.hatColor}"
                @change="${e => this.updateChar('hatColor', parseInt(e.detail.value))}"
              ></wired-slider>
            </div>

            <div class="input-field checkbox-field">
              <wired-checkbox
                ?checked="${this.fire}"
                @change="${e => this.updateChar('fire', e.target.checked)}"
              ></wired-checkbox>
              <label>On Fire</label>
            </div>

            <div class="input-field checkbox-field">
              <wired-checkbox
                ?checked="${this.walking}"
                @change="${e => this.updateChar('walking', e.target.checked)}"
              ></wired-checkbox>
              <label>Walking</label>
            </div>

            <div class="input-field checkbox-field">
              <wired-checkbox
                ?checked="${this.circle}"
                @change="${e => this.updateChar('circle', e.target.checked)}"
              ></wired-checkbox>
              <label>Circle</label>
            </div>
          </div>

          <div class="share-container">
            <wired-button id="share-button" @click="${this.shareCharacter}">Share</wired-button>
            <div id="copiedMessage" style="display:${this.linkCopied ? 'block' : 'none'};">Link Copied!</div>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const params = new URLSearchParams(window.location.search);
    const seedParam = params.get('seed');
    if (seedParam && seedParam.length === 10) {
      this.seed = seedParam;
      this.parseSeed(seedParam);
    }
    const hatParam = params.get('hat');
    if (hatParam && this.hatList.includes(hatParam)) {
      this.hat = hatParam;
      this.hatIndex = this.hatList.indexOf(hatParam);
    }
    const fireParam = params.get('fire');
    if (fireParam !== null) {
      this.fire = fireParam === 'true';
    }
    const walkingParam = params.get('walking');
    if (walkingParam !== null) {
      this.walking = walkingParam === 'true';
    }
    const circleParam = params.get('circle');
    if (circleParam !== null) {
      this.circle = circleParam === 'true';
    }
  }

  //parses the seed string into their corresponding properties
  parseSeed(seed) {
    if (seed.length === 10) {
      this.accessories = parseInt(seed.charAt(0));
      this.base = parseInt(seed.charAt(1));
      this.face = parseInt(seed.charAt(2));
      this.faceItem = parseInt(seed.charAt(3));
      this.hair = parseInt(seed.charAt(4));
      this.pants = parseInt(seed.charAt(5));
      this.shirt = parseInt(seed.charAt(6));
      this.skin = parseInt(seed.charAt(7));
      this.hatColor = parseInt(seed.charAt(8));
    }
  }

  //updates properties when something has changed
  updated(changedProperties) {
    super.updated(changedProperties);

    if ( //regens seed if something has changed
      changedProperties.has('accessories') ||
      changedProperties.has('base') ||
      changedProperties.has('face') ||
      changedProperties.has('faceItem') ||
      changedProperties.has('hair') ||
      changedProperties.has('pants') ||
      changedProperties.has('shirt') ||
      changedProperties.has('skin') ||
      changedProperties.has('hatColor')
    ) {
      this.seed = this.generateSeed();
    }

    if (changedProperties.has('hatIndex')) {
      if (this.hatIndex < 0 || this.hatIndex >= this.hatList.length) {
        this.hatIndex = 0;
      }
      this.hat = this.hatList[this.hatIndex];
    }
  }

  updateChar(prop, val) {
    this[prop] = val;
  }

  //copies the shareable url to clipboard
  shareCharacter() {
    const params = new URLSearchParams();
    params.set('seed', this.seed);
    params.set('hat', this.hat);
    params.set('fire', this.fire);
    params.set('walking', this.walking);
    params.set('circle', this.circle);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    navigator.clipboard.writeText(url).then(() => {
      this.linkCopied = true; //lets user know something successfully copied
      setTimeout(() => {
        this.linkCopied = false;
      }, 2000);
    });
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(RpgMe1.tag, RpgMe1);
