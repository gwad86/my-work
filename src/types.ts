/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScriptSection {
  id: string;
  title: string;
  duration: string;
  visual: string;
  audio: string;
  textOnScreen: string[];
  trigger: string;
}

export interface MarketingStrategy {
  targetAudience: string;
  tone: string;
  platform: "TikTok" | "Instagram" | "Both";
  hook: string;
  callToAction: string;
  script: ScriptSection[];
}
