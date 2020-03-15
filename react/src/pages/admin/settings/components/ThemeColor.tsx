
import { CheckOutlined } from '@ant-design/icons';

import { Tooltip } from 'antd';

import React from 'react';
import { genThemeToString } from '@/utils/utils';
import styles from './ThemeColor.less';

export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = React.forwardRef(
  ({ color, check, ...rest }, ref) => (
    <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
      {check ? <CheckOutlined /> : ''}
    </div>
  ),
);

export interface ThemeColorProps {
  colors?: {
    key: string;
    color: string;
  }[];
  title?: string;
  value: string;
  onChange: (color: string) => void;
}

const ThemeColor: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ThemeColorProps
> = ({ colors, title, value, onChange }, ref) => {
  const colorList = colors || [];
  if (colorList.length < 1) {
    return null;
  }
  console.log(colors);
  return (
    <div className={styles.themeColor} ref={ref}>
      <h3 className={styles.themeColorTitle}>{title}</h3>
      <div className="theme-color-content">
        {colorList.map(({ key, color }) => {
          const themeKey = genThemeToString(key);
          return (
            <Tooltip
              key={color}
              title={
                key
              }
            >
              <Tag
                className={styles.themeColorBlock}
                color={color}
                check={value === key || genThemeToString(value) === key}
                onClick={() => onChange && onChange(key)}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default React.forwardRef(ThemeColor);
