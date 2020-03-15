import React from 'react';
import { Divider, List, Switch } from 'antd';
import styles from './ThemeSettings.less';
import BlockCheckbox from './BlockCheckbox';
import ThemeColor from './ThemeColor';
import LayoutSetting, { renderLayoutSettingItem } from './LayoutChange';

interface BodyProps {
  title: string;
}
const getThemeList = () => {
  const list: {
    key: string;
    fileName: string;
    modifyVars: {
      '@primary-color': string;
    };
    theme: 'dark' | 'light';
  }[] = (window as any).umi_plugin_ant_themeVar || [];
  const themeList = [
    {
      key: 'light',
      url:
        'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
      title: '亮色菜单风格',
    },
    {
      key: 'dark',
      url:
        'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
      title: '暗色菜单风格',
    },
  ];

  const darkColorList: {
    key: string;
    color: string;
    theme: 'dark' | 'light';
  }[] = [
      {
        key: 'daybreak',
        color: '#1890ff',
        theme: 'dark',
      },
    ];

  const lightColorList: {
    key: string;
    color: string;
    theme: 'dark' | 'light';
  }[] = [
      {
        key: 'daybreak',
        color: '#1890ff',
        theme: 'dark',
      },
    ];

  if (list.find(item => item.theme === 'dark')) {
    themeList.push({
      key: 'realDark',
      url:
        'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
      title: '暗色色调',
    });
  }
  // insert  theme color List
  list.forEach(item => {
    const color = (item.modifyVars || {})['@primary-color'];
    if (item.theme === 'dark' && color) {
      darkColorList.push({
        color,
        ...item,
      });
    }
    if (!item.theme || item.theme === 'light') {
      lightColorList.push({
        color,
        ...item,
      });
    }
  });

  return {
    colorList: {
      dark: darkColorList,
      light: lightColorList,
    },
    themeList,
  };
};
const Body: React.FC<BodyProps> = ({ children, title }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 className="ant-pro-setting-drawer-title">{title}</h3>
    {children}
  </div>
);
const ThemeSettings: React.FC = () => {
  const themeList = getThemeList();
  const navTheme = 'dark'
  return (
    <div className={styles.main}>
      <Body
        title="整体风格设置"
      >
        <BlockCheckbox
          list={themeList.themeList}
          value="dark"
          onChange={() => { }}
        />
        <ThemeColor
          title="主题色"
          value="daybreak"
          colors={themeList.colorList[navTheme === 'realDark' ? 'dark' : 'light']}
          onChange={() => { }}
        />
      </Body>
      <Body title='导航模式'>
        <BlockCheckbox
          value="sidemenu"
          onChange={()=>{}}
        />
      </Body>
      <LayoutSetting settings={null} changeSetting={()=>{}} />
      <Divider />
      <Body title="其他设置">
          <List
            split={false}
            renderItem={renderLayoutSettingItem}
            dataSource={[
              {
                title: "色弱模式",
                action: (
                  <Switch
                    size="small"
                    checked={false}
                    onChange={()=>{}}
                  />
                ),
              },
            ]}
          />
        </Body>
    </div>
  )
}
export default ThemeSettings;
