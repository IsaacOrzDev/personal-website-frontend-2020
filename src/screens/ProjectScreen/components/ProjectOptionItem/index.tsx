import React, { useState } from 'react';
import styles from './style.module.scss';
import buttonStyles from 'styles/button.module.scss';
import { useHover } from 'react-use-gesture';
import { ThemeProps } from 'types/Props';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';
import TextService from 'services/textService';

interface Props extends ThemeProps {
  index: number;
  title: string;
  visible?: boolean;
  onClick?: () => void;
  hoverColor?: string;
}

const ProjectOptionItem: React.FC<Props> = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const current = props.index + 1;

  const bind = useHover((state) => setIsHovering(state.hovering));

  let containerClassName = `${buttonStyles.button} ${
    buttonStyles[props.theme]
  } ${styles.container} ${styles[props.theme]}`;
  if (isHovering) {
    containerClassName += ` ${styles.hovering}`;
  }

  return (
    <button
      {...bind()}
      className={containerClassName}
      onClick={props.onClick}
      style={{
        backgroundColor:
          isHovering && !!props.hoverColor ? props.hoverColor : '',
      }}
    >
      <div className={styles.number}>
        <DescriptionText theme={props.theme} fontSize={20} type={'invert'}>
          <Words
            text={TextService.getNumberText(current)}
            visible={props.visible}
            mode="characters"
          />
        </DescriptionText>
      </div>
      <div className={styles.title}>
        <DescriptionText
          theme={props.theme}
          fontSize={20}
          type={isHovering ? 'invert' : 'normal'}
        >
          <Words text={props.title} visible={props.visible} mode="words" />
        </DescriptionText>
      </div>
    </button>
  );
};

export default ProjectOptionItem;
