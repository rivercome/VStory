const mockData: { month: string; value: number; type: string }[] = [];
const energyTypes = [
  { id: 'A', name: '可再生能源' },
  { id: 'B', name: '天然气' },
  { id: 'C', name: '化石燃料' }
];
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

// 为不同季节设置不同的能源消耗模式
energyTypes.forEach(type => {
  months.forEach((month, index) => {
    let value;
    const monthIndex = index + 1;

    // A类 - 可再生能源 (深蓝色)
    if (type.id === 'A') {
      if (monthIndex >= 6 && monthIndex <= 8) {
        // 夏季太阳能高峰
        value = 30 + Math.random() * 15;
      } else if (monthIndex >= 3 && monthIndex <= 5) {
        // 春季可再生能源增加
        value = 20 + Math.random() * 15;
      } else if (monthIndex >= 9 && monthIndex <= 11) {
        // 秋季平衡状态
        value = 25 + Math.random() * 10;
      } else {
        // 冬季太阳能低谷
        value = 10 + Math.random() * 10;
      }
    }

    // B类 - 天然气 (浅蓝色)
    else if (type.id === 'B') {
      if (monthIndex >= 12 || monthIndex <= 2) {
        // 冬季天然气使用增加
        value = 40 + Math.random() * 20;
      } else if (monthIndex >= 6 && monthIndex <= 8) {
        // 夏季中等使用
        value = 30 + Math.random() * 15;
      } else {
        // 春秋季节平稳
        value = 35 + Math.random() * 10;
      }
    }

    // C类 - 化石燃料 (橙色)
    else {
      if (monthIndex >= 12 || monthIndex <= 2) {
        // 冬季化石燃料使用高峰
        value = 60 + Math.random() * 30;
      } else if (monthIndex >= 6 && monthIndex <= 8) {
        // 夏季使用增加但不如冬季
        value = 45 + Math.random() * 15;
      } else if (monthIndex >= 3 && monthIndex <= 5) {
        // 春季使用下降
        value = 35 + Math.random() * 15;
      } else {
        // 秋季平稳
        value = 40 + Math.random() * 10;
      }
    }

    mockData.push({
      month: month,
      value: value,
      type: type.name
    });
  });
});

// // 图表配置
const spec = {
  type: 'rose',
  data: [
    {
      values: mockData
    }
  ],
  title: {
    text: '阳光湾城市能源消耗模式',
    subtext: '按月份和能源类型分布'
  },
  categoryField: 'month',
  valueField: 'value',
  seriesField: 'type',
  outerRadius: 0.8, // 调整为更合适的大小
  innerRadius: 0.1, // 添加内环
  stack: true,
  legends: [
    {
      visible: true,
      position: 'bottom',
      title: '能源类型'
    }
  ],
  colors: ['#0066CC', '#33CCFF', '#FF9900'], // 深蓝色、浅蓝色、橙色
  axes: [
    {
      orient: 'angle',
      bandPadding: 0.02
    }
  ],
  tooltip: {
    visible: true,
    fields: ['month', 'type', 'value'],
    formatter: (datum: { month: any; type: any; value: number }) => {
      return {
        name: `${datum.month} - ${datum.type}`,
        value: `${datum.value.toFixed(1)} 单位`
      };
    }
  },
  animation: {
    duration: 1000,
    easing: 'cubicOut'
  }
};

// // 渲染图表
// const vchart = new VChart(spec, { dom: CONTAINER_ID });
// vchart.renderSync();

// // Just for the convenience of console debugging, DO NOT COPY!
// window['vchart'] = vchart;
import React, { useEffect } from 'react';
import { IStoryDSL, Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';
import bg from '../../assets/infographic/power.png';
registerAll();
export const RoseStory = () => {
  const id = 'DeepseekShockwave';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    container?.appendChild(canvas);

    const dsl: IStoryDSL = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  // 给所有元素都先给一展示动作，不设置具体动画属性的话，它们会直接展示
                  characterId: ['title', 'chart'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1000, // 开始动画的时间
                      payload: [
                        {
                          animation: {
                            duration: 800, // 持续时间
                            easing: 'linear', // 差值方法
                            effect: 'wipe' // 效果
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['background'],
                  characterActions: [
                    {
                      action: 'appear'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      characters: [
        {
          id: 'background', // 元素 id 后面会用到
          type: 'Image', // 类型
          zIndex: 0, // 层级
          position: {
            // 元素的位置大小
            x: 0,
            y: 0,
            width: 1024,
            height: 700
          },
          options: {
            graphic: {
              image: bg,
              fillOpacity: 0.5 // 透明度
            }
          }
        },
        {
          id: 'chart',
          type: 'VChart',
          zIndex: 1,
          position: {
            //先随便给一位置吧
            x: 5,
            y: 50,
            width: 600, // 注意要给宽高
            height: 600
          },
          options: {
            spec: spec // 之前内容准备时的图表配置
          }
        },
        {
          id: 'title',
          type: 'Text',
          zIndex: 1,
          position: { x: 512, y: 0, width: 1024, height: 100 },
          options: {
            graphic: {
              text: `阳光湾城市能源消耗模式`,
              fill: 'black',
              fontSize: 48,
              textAlign: 'center',
              fontWeight: 'bolder'
            }
          }
        }
      ]
    };

    const story = new Story(dsl, {
      canvas,
      width: 1024,
      height: 700,
      scaleX: 'auto',
      scaleY: 'auto'
    });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
