import dayjs, { Dayjs } from "dayjs";

export const hour = (keys: number) => [...Array(keys).keys()];

export function calcWeek(start?: string): Dayjs[] {
  //現在の週のデータを計算
  const date = start ? dayjs(start) : dayjs(); // 引数のstartに日付が入っていたらその日付を使ってdateに日付を返し、そうでない場合は現在の日付を返す
  const day = date.day(); // dateから曜日を取得(0[日]~6[土]で取得)
  const startDay = date.subtract(day, "d"); // 日付からdayの数字分引いて日曜日の日付を返す
  const week: Dayjs[] = []; // Dayjs型の配列として初期化
  for (let day = 0; day < 7; day++) {
    week.push(startDay.add(day, "day")); // startDayに曜日の数字を足すことでその曜日と日付を取得している
  }
  return week;
}

//"d"は「日付の操作」の単位
//"day"は曜日に基づいて日付を操作できる
