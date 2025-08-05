export function downloadCSV(data: { name: string; value: number }[], filename: string = "backtest_results.csv") {
  const header = "지표,값\n";
  const body = data.map(row => `${row.name},${row.value}`).join("\n");
  const csvContent = header + body;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}