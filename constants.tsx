
import { QuestionPart1, QuestionCircle } from './types';

export const PART1_QUESTIONS: QuestionPart1[] = [
  { cantonese: '去飲茶', options: ['上茶樓', '去吃飯', '去喝水', '去逛街'], correctAnswer: '上茶樓' },
  { cantonese: '攞飛', options: ['拿票', '取號', '買票', '取票'], correctAnswer: '取號' },
  { cantonese: '搭枱', options: ['搭桌子', '併桌', '拼桌', '併檯'], correctAnswer: '拼桌' },
  { cantonese: '斟茶', options: ['泡茶', '倒茶', '沖茶', '端茶'], correctAnswer: '倒茶' },
  { cantonese: '匙羹', options: ['湯匙', '勺子', '羹匙', '勺兒 / 飯勺兒'], correctAnswer: '勺兒 / 飯勺兒' },
  { cantonese: '埋單', options: ['買單', '結賬', '付錢', '算賬'], correctAnswer: '結賬' },
  { cantonese: '貼士', options: ['小費', '貼士', '提示', '建議'], correctAnswer: '小費' },
  { cantonese: '行街 / 商場', options: ['走路', '去商場', '逛街 / 商場', '購物'], correctAnswer: '逛街 / 商場' },
  { cantonese: '抵', options: ['便宜', '合算', '值', '划算'], correctAnswer: '合算' },
  { cantonese: '平嘢', options: ['平貨', '廉價品', '特價品', '便宜貨'], correctAnswer: '便宜貨' },
  { cantonese: '波鞋', options: ['運動鞋', '球鞋', '籃球鞋', '足球鞋'], correctAnswer: '運動鞋' },
  { cantonese: '波衫', options: ['運動衫', '球隊服', '球衣', '比賽服'], correctAnswer: '球衣' },
  { cantonese: '髮夾', options: ['髮夾', '髮卡', '頭卡', '髮飾'], correctAnswer: '髮卡' },
  { cantonese: '頭箍', options: ['頭箍', '髮帶', '髮箍', '髮飾'], correctAnswer: '髮箍' },
];

export const PART2_QUESTIONS: QuestionCircle[] = [
  { sentence: "來吧！我們一起去看看好嗎？", targets: ["吧", "們", "看", "嗎"] },
  { sentence: "把你的東西拿了就走。", targets: ["的", "了"] },
  { sentence: "那個男孩子抱著一塊石頭。", targets: ["子", "頭"] },
  { sentence: "書桌上的筆掉到前邊兒了。", targets: ["的", "了"] },
  { sentence: "弟弟和媽媽在公園裡逛逛。", targets: ["弟", "媽", "逛"] },
  { sentence: "熱鬧的故事會上，大家都喜歡穿漂亮的衣服。", targets: ["鬧", "的", "歡", "亮", "服"] },
  { sentence: "爸爸，那兒很熱鬧，我們去看看。", targets: ["爸", "鬧", "看"] },
  { sentence: "你喜歡甚麼顏色的氣球？", targets: ["歡", "麼", "的"] },
  { sentence: "我喜歡紅色，給我扭一把紅色的長劍，好嗎？", targets: ["歡", "的", "嗎"] },
  { sentence: "謝謝！", targets: ["謝"] },
];

export const PART3_QUESTIONS: QuestionCircle[] = [
  { sentence: "二哥最喜歡喝普洱。", targets: ["二", "洱"] },
  { sentence: "他的兒子有一雙很大的耳朵。", targets: ["兒", "耳"] },
  { sentence: "你這一題答得快而準。", targets: ["而"] },
];

export const PART4_QUESTIONS: QuestionCircle[] = [
  { sentence: "這的春卷很好吃，要來一碟嗎？", targets: ["這", "春卷", "一碟"] },
  { sentence: "快來這邊坐，陪我吃瓜子。", targets: ["這邊", "瓜子"] },
  { sentence: "你別一看到豆腐腦就一個勁兒吃，小心吃壞肚皮。", targets: ["豆腐腦", "一個勁兒"] },
];
