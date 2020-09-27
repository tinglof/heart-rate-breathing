import React, { useRef } from "react";
import styles from "./swipe-input.module.scss";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
} from "react-snaplist-carousel";
import InputItem from "../input-item/input-item";

const itemWidth = 95;

const SwipeInput = ({ title, headline, inputValues, onChangeValue }) => {
  const snapList = useRef(null);

  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    (elements, elementInCenter) => {
        if(elementInCenter) {
            onChangeValue(inputValues[elementInCenter]);
        }
        return elementInCenter;
    }
  );
  const goToChildren = useScroll({ ref: snapList });
  
  useDragToScroll({ ref: snapList });

  const createInputItems = () => {
    if (!(inputValues && inputValues instanceof Array)) {
      return [];
    }

    return inputValues.map((item, index) => {
      if (index === 0) {
        return (
            <SnapItem key={index} margin={{ left: `calc(50% - (${itemWidth}px/2)`, right: "10px" }} snapAlign="center">
                <InputItem
                    style={{width: itemWidth, height: itemWidth}}
                    onClick={() => { onChangeValue(item); goToChildren(index);}}
                    visible={visible === index}
                    value={item}/>
            </SnapItem>
        );
      }

      if (index === inputValues.length - 1) {
        return (
            <SnapItem key={index} margin={{ left: `10px`, right: `calc(50% - (${itemWidth}px/2)` }} snapAlign="center">
                <InputItem
                    style={{width: itemWidth, height: itemWidth}}
                    onClick={() => { onChangeValue(item); goToChildren(index);}}
                    visible={visible === index}
                    value={item}/>
            </SnapItem>
        );
      }

      return (
        <SnapItem key={index} margin={{ left: "10px", right: "10px" }} snapAlign="center">
            <InputItem 
                style={{width: itemWidth, height: itemWidth}}
                onClick={() => {onChangeValue(item); goToChildren(index);}}
                visible={visible === index}
                value={item}/>
        </SnapItem>
      );
    });
  };

  const items = createInputItems(inputValues);

  return (
    <div className={styles.wrapper}>
        <div className={styles['text-wrapper']}>
            {title && <p className={styles.title}>{title}</p>}
            {headline && <h2 className={styles.headline}>{headline}</h2>}
        </div>
        <SnapList ref={snapList} direction="horizontal" height="auto">
            {items}
        </SnapList>
    </div>
  );
};

SwipeInput.defaultProps = {
  onChangeValue: () => {},
};

export default SwipeInput;
