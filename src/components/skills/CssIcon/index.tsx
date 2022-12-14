import React from 'react';
import { SkillIconProps } from 'types/Props';

interface Props extends SkillIconProps {}

const CssIcon: React.FC<Props> = props => {
  return (
    <div className={`skill_icon ${props.size}`}>
      <svg viewBox="0 0 256 232" preserveAspectRatio="xMidYMid">
        <path
          d="M100.902 231.618l116.456-38.653L256 0H37.867L29.57 43.056h174.812l-5.443 27.49H23.862L15.3 113.602h174.823l-9.602 49.284-70.547 23.076-60.955-23.076 4.16-21.528H10.123L0 192.965l100.902 38.653"
          fill="#444"
        />
      </svg>
    </div>
  );
};

CssIcon.defaultProps = {
  size: 'normal',
};

export default CssIcon;
