export function countWorkDays(
  employeeName: string,
  startDate: string,
  endDate: string
): number {
  let count = 0;

  // 開始日から終了日までの日付を生成して繰り返し処理
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const formattedDate = currentDate.toISOString().split("T")[0]; // "YYYY-MM-DD"形式に変換
    const key = `${employeeName}-${formattedDate}`;
    const value = localStorage.getItem(key);

    // "休"以外のシフトの場合は出勤とみなしてカウント
    if (value && value !== "休") {
      count++;
    }

    // 1日進める
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}
