import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import CircleIcon from "@mui/icons-material/Circle";

interface ShiftButtonProps {
  id: string; // 各ボタンの一意なID
  weekKey: number; // 週の識別キー
}

export default function TestShiftButtonSimple({
  id,
  weekKey,
}: ShiftButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState("＋"); // 初期値のみ指定

  React.useEffect(() => {
    // 週が変わったときに選択状態をリセットする場合
    setSelectedValue("＋");
  }, [weekKey]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value); // 選択された値を状態に設定
    handleClose(); // メニューを閉じる
  };

  const getButtonColor = () => {
    switch (selectedValue) {
      case "朝":
        return "#FC9CB6"; // ピンク
      case "中":
        return "#F7B532"; // オレンジ
      case "遅":
        return "#AD90ED"; // 紫
      case "休":
        return "#CBC9C9"; // 灰色
      default:
        return "transparent"; // デフォルトの色(未選択時)
    }
  };

  return (
    <>
      <Button
        id={`fade-button-${id}`}
        variant="outlined"
        aria-controls={open ? `fade-menu-${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: getButtonColor(),
          color: selectedValue !== "＋" ? "#FFFFFF" : undefined,
          borderColor: selectedValue === "＋" ? undefined : "transparent", // 選択時はボーダーを消す
          "&:hover": {
            backgroundColor: getButtonColor(),
            opacity: 0.8,
          },
        }}
      >
        {selectedValue} {/* 選択された値を表示 */}
      </Button>
      <Menu
        id={`fade-menu-${id}`}
        MenuListProps={{
          "aria-labelledby": `fade-button-${id}`,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("朝")}
          sx={{ color: "#4B4B4B" }}
        >
          <CircleIcon fontSize="small" sx={{ pr: 1, color: "#F89DB5" }} />朝
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("中")}
          sx={{ color: "#4B4B4B" }}
        >
          <CircleIcon fontSize="small" sx={{ pr: 1, color: "#FCC049" }} />中
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("遅")}
          sx={{ color: "#4B4B4B" }}
        >
          <CircleIcon fontSize="small" sx={{ pr: 1, color: "#D786EC" }} />遅
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("休")}
          sx={{ color: "#4B4B4B" }}
        >
          <CircleIcon fontSize="small" sx={{ pr: 1, color: "#CBC9C9" }} />休
        </MenuItem>
      </Menu>
    </>
  );
}
