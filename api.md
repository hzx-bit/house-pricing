# 房屋价格评估系统 API 文档

## 基础配置
- 基础URL: `http://localhost:8080`
- 所有接口返回格式均为 JSON

## 接口列表

### 1. 获取所有城市
- 路径: `/getAllCities`
- 方法: `GET`
- 描述: 获取所有可选择的城市列表
- 返回示例:
```json
{
  "code": 200,
  "data": [
    { "value": "beijing", "label": "北京", "adcode": "110000" },
    { "value": "shanghai", "label": "上海", "adcode": "310000" },
    { "value": "guangzhou", "label": "广州", "adcode": "440100" }
  ]
}
```

### 2. 获取城市下的所有区域
- 路径: `/getAllDistrictOfCity`
- 方法: `GET`
- 参数: 
  - `city`: 城市代码（如：beijing）
- 描述: 根据选择的城市获取其下属的所有区域
- 返回示例:
```json
{
  "code": 200,
  "data": [
    { "value": "chaoyang", "label": "朝阳区" },
    { "value": "haidian", "label": "海淀区" },
    { "value": "dongcheng", "label": "东城区" },
    { "value": "xicheng", "label": "西城区" }
  ]
}
```

### 3. 房屋评估
- 路径: `/evaluate`
- 方法: `POST`
- 参数:
```json
{
  "region": "beijing",
  "district": "chaoyang",
  "layout": "3室2厅",
  "area": 89,
  "orientation": "南北",
  "decoration": "精装",
  "floor": 12,
  "totalFloors": 18,
  "year": 2015,
  "structure": "钢混"
}
```
- 返回示例:
```json
{
  "code": 200,
  "data": {
    "totalPriceRange": "580-620万",
    "unitPriceRange": "65,000-70,000元/㎡",
    "similarHouses": [
      {
        "address": "朝阳区中关村南大街5号",
        "area": 90,
        "layout": "3室2厅",
        "floor": "12/18层",
        "price": 595,
        "unitPrice": 66111,
        "similarity": 95
      }
    ]
  }
}
```

### 4. 获取房价趋势数据
- 路径: `/getPriceTrend`
- 方法: `GET`
- 参数:
  - `city`: 城市代码
  - `district`: 区域代码
- 返回示例:
```json
{
  "code": 200,
  "data": {
    "dates": ["2023-01", "2023-02", "2023-03"],
    "prices": [85000, 86000, 87000]
  }
}
```

### 5. 获取区域房价分布数据
- 路径: `/getPriceDistribution`
- 方法: `GET`
- 参数:
  - `adcode`: 城市行政区划代码（如：110000）
- 返回示例:
```json
{
  "code": 200,
  "data": {
    "districts": [
      { "name": "朝阳区", "value": 85000 },
      { "name": "海淀区", "value": 82000 },
      { "name": "东城区", "value": 88000 },
      { "name": "西城区", "value": 86000 }
    ]
  }
}
```

## 错误码说明
- 200: 成功
- 400: 请求参数错误
- 404: 资源不存在
- 500: 服务器内部错误

## adcode列表
北京市 - 110000
天津市 - 120000
上海市 - 310000
重庆市 - 500000
石家庄市 - 130100
唐山市 - 130200
太原市 - 140100
呼和浩特市 - 150100
沈阳市 - 210100
大连市 - 210200
长春市 - 220100
哈尔滨市 - 230100
南京市 - 320100
无锡市 - 320200
苏州市 - 320500
杭州市 - 330100
宁波市 - 330200
合肥市 - 340100
福州市 - 350100
厦门市 - 350200
南昌市 - 360100
济南市 - 370100
青岛市 - 370200
郑州市 - 410100
武汉市 - 420100
长沙市 - 430100
广州市 - 440100
深圳市 - 440300
珠海市 - 440400
佛山市 - 440600
南宁市 - 450100
海口市 - 460100
成都市 - 510100
贵阳市 - 520100
昆明市 - 530100
拉萨市 - 540100
西安市 - 610100
兰州市 - 620100
西宁市 - 630100
银川市 - 640100
乌鲁木齐市 - 650100
秦皇岛市 - 130300
邯郸市 - 130400
保定市 - 130600
大同市 - 140200
包头市 - 150200
鞍山市 - 210300
吉林市 - 220200
齐齐哈尔市 - 230200
常州市 - 320400
南通市 - 320600
温州市 - 330300
嘉兴市 - 330400
芜湖市 - 340200
泉州市 - 350500
九江市 - 360400
烟台市 - 370600
潍坊市 - 370700
洛阳市 - 410300
宜昌市 - 420500
襄阳市 - 420600
株洲市 - 430200
惠州市 - 441300
中山市 - 442000
柳州市 - 450200
三亚市 - 460200
绵阳市 - 510700
遵义市 - 520300
大理白族自治州 - 532900
宝鸡市 - 610300
天水市 - 620500
海东市 - 630200
石嘴山市 - 640200
克拉玛依市 - 650200
张家口市 - 130700
运城市 - 140800
锦州市 - 210700
大庆市 - 230600
绍兴市 - 330600
漳州市 - 350600
