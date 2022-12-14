import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useTransition } from 'react-spring';

interface Props extends ThemeProps {
  position: { x: number; y: number };
  visible?: boolean;
  onExit?: () => void;
  children: React.ReactNode;
}

const DropdownModal: React.FC<Props> = (props) => {
  const [attached, setAttached] = useState(false);

  const [visible, setVisible] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const transitions = useTransition(props.visible, {
    from: { opacity: 0, maxHeight: 0 },
    enter: { opacity: 1, maxHeight: 420 },
    leave: { opacity: 0, maxHeight: 0 },
  });

  useEffect(() => {
    if (props.visible && !attached) {
      setTimeout(() => {
        setVisible(true);
        document.addEventListener('click', _listenOnClick);
        setAttached(true);
      }, 400);
    } else if (!props.visible && attached) {
      setAttached(false);
      document.removeEventListener('click', _listenOnClick);
      setVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const _listenOnClick = useCallback((e: any) => {
    if (!divRef.current?.contains(e.target)) {
      props.onExit && props.onExit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        top: props.position.y,
        left: props.position.x,
        // display: props.visible ? 'block' : 'none',
      }}
      ref={divRef}
    >
      {transitions(
        ({ opacity, maxHeight }, item) =>
          item && (
            <animated.div
              className={
                visible ? `${styles.content} ${styles.visible}` : styles.content
              }
              style={{
                opacity,
                maxHeight,
              }}
            >
              {props.children}
            </animated.div>
          )
      )}
    </div>
  );
};

export default DropdownModal;
