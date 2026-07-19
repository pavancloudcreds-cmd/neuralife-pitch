# NeuraPad SmartPad — Hardware Specification & ODM RFQ (v1.1)

**NeuraLife Edtech Private Limited** | Registered Office: Vizianagaram, Andhra Pradesh
**Status:** Draft for ODM outreach — v2 hardware track
**Target:** 5 evaluation units → pilot batch → 500+ unit production run
**Target bulk price:** Under ₹12,000/unit

> **Sourcing key:** ✅ = cross-checked against live market data (July 2026). ⚠️ = carried forward or estimated, still needs vendor RFQ confirmation. Do not treat any ⚠️ price as final until a vendor Proforma Invoice is in hand.

---

## 0. Company Reference (for RFQ/PI use)

| Field | Value |
|---|---|
| Company name | NeuraLife Edtech Private Limited |
| CIN | U58200AP2026PTC127009 |
| Date of incorporation | 16 July 2026 |
| Registered office | 3-85, Main Veedhi, Pedamanapuram, Datti Rajeru, Vizianagaram, AP – 535580 |
| Shipping address (samples) | 8-3-293/82/28/A, Jawahar Colony, Srinagar Colony, Shaikpet, Jubilee Hills, Hyderabad, Telangana – 500034 |
| Contact person | Pavan Kumar Jagarapu, Founder / Executive Director |
| Contact email / phone | pavankumar@neuralife.in · +91 91824 42102 |

---

## 1. Form Factor & Display

| Spec | Value |
|---|---|
| Screen size | 10.3" diagonal |
| Dimensions | ~240–248mm × 180–182mm × 6.8–8mm |
| Weight | 390–420g |
| Panel | E Ink Carta 1200 (or Carta 1000 equivalent) |
| Resolution | 1404×1872 (227 PPI) |
| Greyscale | 16-level |
| Refresh modes | A2 fast-partial (<20–26ms, active writing) / GL16 partial (~120–250ms, transitions) / GC16 full (~700ms–1.8s, chapter load) |
| Frontlight | Warm (3000K) + cool (6500K), adjustable, ambient-light auto-adjust |
| Cover glass | Gorilla Glass 3 equivalent, 1mm |

**✅ Confirmed:** 10.3" E Ink Carta panel at this exact resolution is a real, currently-manufactured component (E Ink's own Carta 1000/1200 module, Good Display's GDEP103TC2). Buildable today, not speculative.

### 1.1 — Paper-Like Writing Surface (non-negotiable)
AG-etched protective sheet (≥30% haze, ASTM D1003) + textured stylus nib material. **Cannot be verified from a datasheet — must be physically sample-tested** as part of the 5-unit evaluation (see checklist, Section 13).

---

## 2. Processor, Memory, Edge AI

| Spec | Value |
|---|---|
| SoC | Rockchip RK3566 — quad-core Cortex-A55, 1.8GHz |
| GPU | Mali-G52 2EE |
| NPU | 0.8–1.0 TOPS |
| RAM | 4GB LPDDR4 |
| Storage | 32GB eMMC 5.1 |
| AI budget | Max 512MB total, <200ms inference per stroke batch |
| Models | HWR-1 (handwriting OCR) + GAP-1 (gap detection) at v1/v2; WSS-1 + SHE-1 added v2 |

**✅ Confirmed:** RK3566 is a real, stocked component (~$10.55 single-unit at LCSC; credible bulk range $7–8 at volume). **RK3566 already ships in a production E-Ink Android tablet** (Lenovo "Paper Smart") — validates a working Android + E-Ink BSP exists for this chip.

---

## 3. Stylus (EMR — Battery-Free, Standard Pen Form Factor)

| Spec | Value |
|---|---|
| Protocol | EMR (Electromagnetic Resonance) — no battery, powered by induction from the panel |
| Form factor | Standard cylindrical pen barrel (same silhouette as common EMR pens — not a stylus-puck shape) |
| Pressure levels | 4096 |
| Tilt detection | 60° |
| Report rate | 200Hz |
| Latency | 14ms end-to-end |
| Storage | Magnetic snap-in slot, 2kg pull-force retention |

### 3.1 — Write / Erase / Scroll Mapping (confirmed design)

Two physical ends on the pen — nib and a flat rounded end — plus one barrel button:

| Action | Input |
|---|---|
| **Write** | Nib touches surface |
| **Erase** | Flat rounded end touches surface (recognized via distinct electromagnetic signature — standard EMR behavior) |
| **Scroll** | Barrel button **held** + flat rounded end touching surface (drag to scroll) |

This uses only proven, off-the-shelf EMR pen mechanics (two-end pen + one button) — no new pen tooling required, and no battery/charging dependency, satisfying the "always works, never needs charging" requirement directly.

---

## 4. Power

| Spec | Value | Status |
|---|---|---|
| Battery capacity | **6,200mAh — confirmed, resolves prior internal conflict** | ✅ Settled |
| Target life | 2–3 weeks typical school use | Per Investor Brief power budget model |
| Charging | USB-C, 18W fast charge, ~3.5hr full charge | |
| Cycle rating | 500 full cycles to 80% capacity | |
| 8-year target | 500 cycles ÷ ~1 cycle/week ≈ 10 years — achievable if usage stays near this cadence | Monitor in pilot; budget a battery-swap service option at year 4–5 as contingency |

---

## 5. Location & Recovery: GPS + LoRa (No SIM)

**Confirmed approach: passive GNSS positioning + LoRa for reporting. No cellular, no SIM card — consistent with the existing "WiFi-only, no SIM, permanently" architecture.**

| Component | Job | Cost | Status |
|---|---|---|---|
| GNSS chip | Determines device coordinates | ~$1–5/unit in bulk | ✅ Confirmed market range |
| LoRa transceiver (Semtech SX1262 or equivalent) on the SmartPad | Reports coordinates over long range without WiFi or cellular | ⚠️ Bare IC bulk pricing not confirmed this round — dev-kit/module prices seen ($15–140) are **not representative** of bulk OEM component cost; get an actual quote | Needs RFQ confirmation |
| LoRa gateway added to the existing NeuraSync Hub (per school) | Receives location beacons from all pads in range, relays to cloud via the Hub's existing 4G link | ~₹2,000 Hub BOM (existing) + LoRa gateway add-on cost TBD | Extends infrastructure already being deployed — no new per-school hardware category |

**Why this combination:** GNSS gives the coordinates ("fox hunting" — locating the transmitter); LoRa gets that data back to the school without needing WiFi or cellular on the pad itself, using multi-km range even without a direct network connection. This is a meaningfully better recovery approach than WiFi-only, without reopening the no-SIM decision.

**Honest limit to set expectations on:** LoRa range is very good (multi-km line-of-sight) but not unlimited — a device taken far outside gateway range (e.g., a different city) will still go dark until it re-enters range of a NeuraSync Hub or another LoRa gateway. This materially improves recovery odds over WiFi-only, but "guaranteed recovery" still isn't a claim to make. Remote wipe remains the real data-protection backstop regardless of physical recovery.

---

## 6. Rear Camera — Note/Text Scanning

**Requested capability:** student photographs printed or handwritten notes/pages; on-device text extraction.

| Spec | Value | Status |
|---|---|---|
| Camera | Rear-facing, autofocus (fixed-focus is not sufficient for legible document capture) | Recommend 5–8MP class for readable text at typical note-taking distance |
| Cost | ⚠️ Not confirmed this round — expect meaningfully more than a fixed-focus front camera line item; get vendor quote for autofocus rear module specifically | Needs RFQ |
| OCR engine | Distinct from HWR-1. HWR-1 processes live stylus stroke data, not photographs — a photo-based text extraction needs a separate on-device OCR model. This does not conflict with the "no ML Kit for HWR-1" decision, since that restriction is specifically about not replacing stroke-based gap analysis. | New design decision |

**Privacy safeguard:**
- Camera only accessible inside a whitelisted "Scan Notes" flow — never a general camera app
- No photo gallery exposed to the student
- Captured images processed for OCR text on-device, then not retained long-term by default — mirrors the "raw strokes purged after 24 hours, never uploaded" pattern already used for handwriting data
- No arbitrary photography capability outside this flow

---

## 7. Group Study Screen Sharing — Two Modes

| Mode | Network | Architecture | Complexity |
|---|---|---|---|
| **Local (school)** | School WiFi via the NeuraSync Hub, or teacher's local WiFi | Local network relay — no internet round-trip required | Straightforward — uses infrastructure already planned |
| **Remote (home)** | Different students' separate home networks | Requires an internet-relayed connection (signaling + relay server) | A genuinely bigger build — real cloud infrastructure, bandwidth cost, and new safety design |

**Recommendation:** build the local (school WiFi) mode first. Treat the remote (home WiFi) mode as a separate, later-stage feature requiring its own safety and infrastructure design pass.

---

## 8. Chassis, Durability, Ports

PC + glass-fibre back, 6000-series aluminium frame, 1.2–1.5m MIL-STD-810G drop rating, IP52, USB-C (10,000 insertion cycles), no SD card slot, no SIM tray.

---

## 9. Software / OS — "No Complex Kernel Work" Requirement

Achievable via ODM selection, not a technical constraint. Since RK3566 already ships in production E-Ink Android tablets, a vendor whose BSP already includes a working E-Ink display driver + digitizer HAL means NeuraLife's build work is confined to the application layer (NeuraHome launcher, kiosk lockdown, Edge AI Runtime, Stroke Logger, Sync Agent).

**Hard qualifying question for any ODM:** *"Does your reference board's BSP already include a working E-Ink display driver and digitizer HAL for Android, and can units ship with an unlocked bootloader and BSP source access for our own build?"*

---

## 10. Microphone / Speaker

1× mic (bottom edge), 2× 1W side-firing speakers.

---

## 11. Stylus Tip Replacement — Supply Chain

- Ship a small pack of spare tips (3–5) in the box with every unit at launch
- Add an "Order Consumables" flow to the Web Admin Console so schools can reorder tip packs directly
- ⚠️ Per-tip cost not confirmed this round — get exact bulk pricing from the ODM as part of the RFQ

---

## 12. RMA / Warranty Logistics

Before committing to production volume, get a written answer to: **if a unit fails in a rural AP school, what is the actual repair/replacement path?**

Specific questions for every ODM:
- India-based repair/replacement center, or does every RMA require shipping the unit back to China?
- Average turnaround time for each path?
- What's covered under the standard 1-year warranty vs. what's chargeable?
- Bulk spare-parts kit available for common failure points (digitizer, battery, USB-C port) so a local technician could handle basic repairs without a full RMA cycle?

---

## 13. RFQ Checklist — What to Ask Every Vendor

- [ ] Datasheet for 10.3" RK3566 E-Paper reference design (digitizer details, supported AOSP version)
- [ ] Confirmation of unlocked bootloader + BSP source access for evaluation units
- [ ] Confirmation of working E-Ink display driver + digitizer HAL already in their BSP
- [ ] Proforma Invoice for 5 evaluation units, ship via Air Express to: 8-3-293/82/28/A, Jawahar Colony, Srinagar Colony, Shaikpet, Jubilee Hills, Hyderabad, Telangana – 500034
- [ ] Tiered bulk pricing: 5 / 500 / 5,000 / 25,000 units
- [ ] NRE/tooling cost broken out separately from per-unit marginal cost
- [ ] Sample-cost credit against future production order, in writing
- [ ] AG/matte texture samples for physical hands-on evaluation — this is a pass/fail tactile test, not a spec number
- [ ] LoRa module integration feasibility + bulk unit cost
- [ ] Autofocus rear camera module option + bulk unit cost
- [ ] Stylus replacement tip bulk pricing and MOQ
- [ ] RMA/repair process for India-deployed units — India-based path or China-only?
- [ ] BIS/CRO compliance support history for prior India clients

---

*Document version 1.1 — updated from v1.0 with: battery capacity resolved (6,200mAh), GPS+LoRa recovery approach confirmed, stylus write/erase/scroll mapping clarified, rear camera added for note-scanning with privacy safeguards, group study split into local/remote modes with distinct safety design, stylus tip resupply and RMA logistics added.*
