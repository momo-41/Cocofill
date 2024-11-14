import React from "react";

interface CompareWorkStyleWeekProps {
  workStyleWeek: number; //希望週間出勤日数
  weekdayOffRequests: number; //希望平日に何日休みたいかの日数
  weekendOffRequests: number; //希望休日に何日休みたいかの日数
  workCountWeek: number; //週間勤務日数
  workCountWeekday: number; //平日勤務日数
  workCountWeekend: number; //休日勤務日数
}

const CompareWorkStyleWeek: React.FC<CompareWorkStyleWeekProps> = ({
  workStyleWeek,
  weekdayOffRequests,
  weekendOffRequests,
  workCountWeek,
  workCountWeekday,
  workCountWeekend,
}) => {
  return (
    <div>
      {workCountWeek > workStyleWeek ? "※" : "◎"} 週間勤務 {workCountWeek} 日 (
      {workStyleWeek})
      <br />
      {/* 5(平日の数) - 平日働いている日数 = 平日に休む日数 */}
      {5 - workCountWeekday < weekdayOffRequests ? "※" : "◎"} 平日勤務{" "}
      {workCountWeekday} 日 ({5 - weekdayOffRequests})
      <br />
      {/* 2(休日の数) - 休日働いている日数 = 休日に休む日数 */}
      {2 - workCountWeekend < weekendOffRequests ? "※" : "◎"} 休日勤務{" "}
      {workCountWeekend} 日 ({2 - weekendOffRequests})
    </div>
  );
};

// ※ 週間勤務 6 日 (5)
// ◎ 平日勤務 5 日 (5)
// ◎ 休日勤務 1 日 (2)
// ()の中は ※ だった場合にその勤務日数を何日にすれば ◎ なるのかの日数。
// 上記の場合、週間勤務が ※ で、()の中には5と書いてあるので、週間勤務を5日すれば ◎ になる。
// ※が表示されている時だけ()を表示させるようにする？

export default CompareWorkStyleWeek;

// 元々 "※" か "◎" を表示するためのコンポーネントだったが、勤務日数の隣に"※"や"◎"などの印を表示したかったため、
// 出勤日数に関してもpropsで持たせてこのコンポーネントでまとめて表示している。
// 親コンポーネントと子コンポーネント間での、workCountWeekのpropsの移動に違和感は持っている。
