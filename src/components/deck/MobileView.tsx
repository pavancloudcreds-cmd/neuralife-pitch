import { SLIDES } from '../../types/deck';
import Slide01_ColdOpen from '../slides/Slide01_ColdOpen';
import Slide02_SystemicProblem from '../slides/Slide02_SystemicProblem';
import Slide03_PersonaClassroom from '../slides/Slide03_PersonaClassroom';
import Slide04_PersonaAdmin from '../slides/Slide04_PersonaAdmin';
import Slide05_Competitive from '../slides/Slide05_Competitive';
import Slide06_WhyNow from '../slides/Slide06_WhyNow';
import Slide07_Solution from '../slides/Slide07_Solution';
import Slide08_PersonaOutcomes from '../slides/Slide08_PersonaOutcomes';
import Slide09_Moats from '../slides/Slide09_Moats';
import Slide10_Proof from '../slides/Slide10_Proof';
import Slide11_FeatureSpotlight from '../slides/Slide11_FeatureSpotlight';
import Slide12_Roadmap from '../slides/Slide12_Roadmap';
import Slide13_Timeline from '../slides/Slide13_Timeline';
import Slide14_Validation from '../slides/Slide14_Validation';
import Slide15_AskClose from '../slides/Slide15_AskClose';

const slideComponents = [
  Slide01_ColdOpen, Slide02_SystemicProblem, Slide03_PersonaClassroom,
  Slide04_PersonaAdmin, Slide05_Competitive, Slide06_WhyNow,
  Slide07_Solution, Slide08_PersonaOutcomes, Slide09_Moats,
  Slide10_Proof, Slide11_FeatureSpotlight, Slide12_Roadmap,
  Slide13_Timeline, Slide14_Validation, Slide15_AskClose,
];

const bgLight = '#F5F3EE';
const bgDark  = '#0A0E1A';

export default function MobileView() {
  return (
    <div className="w-full" style={{ overflowY: 'auto', height: '100%' }}>
      <div className="sticky top-0 z-10 flex items-center justify-center py-2 bg-warm/90 backdrop-blur border-b border-teal/10">
        <span className="text-xs font-inter text-teal font-medium tracking-wide">
          NeuraLife — Scroll to explore
        </span>
      </div>

      {SLIDES.map((slide, i) => {
        const SlideComponent = slideComponents[i];
        const bg = slide.theme === 'dark' ? bgDark : bgLight;
        const maxBeat = slide.beatCount - 1;

        return (
          <div
            key={slide.id}
            style={{ background: bg, minHeight: '90vh' }}
            className="relative flex items-center justify-center py-16"
          >
            {/* Slide number badge */}
            <div
              className="absolute top-4 left-6 text-xs font-inter font-semibold opacity-30"
              style={{ color: slide.theme === 'dark' ? '#fff' : '#0B6E6E' }}
            >
              {String(slide.id).padStart(2, '0')}
            </div>
            <div className="w-full" style={{ maxHeight: '85vh' }}>
              <SlideComponent beatIndex={maxBeat} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
