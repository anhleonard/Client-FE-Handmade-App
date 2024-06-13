import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { COLORS } from "@/enum/colors";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StatusStepOrder from "./status-step-order";
import { Order } from "@/enum/defined-types";
import { formatCommonTime, formatDate } from "@/enum/functions";

type Props = {
  order: Order;
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: COLORS.primary.c200,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  color: "#fff", //màu icon
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  background: COLORS.primary.c900, // background sau icon
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <DescriptionOutlinedIcon />,
    2: <LocalAtmOutlinedIcon />,
    3: <LocalShippingOutlinedIcon />,
    4: <LocalMallOutlinedIcon />,
    5: <StarBorderRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const CustomizedSteppers = ({ order }: Props) => {
  const steps = [
    {
      label: "Đơn hàng đã đặt",
      time: formatCommonTime(order?.orderAt),
      key: "orderAt",
    },
    {
      label: "Đơn hàng được người bán duyệt",
      time: formatCommonTime(order?.processingAt),
      key: "processingAt",
    },
    {
      label: "Đơn hàng đang được giao",
      time: formatCommonTime(order?.deliveredAt),
      key: "deliveredAt",
    },
    {
      label: "Đã nhận được hàng",
      time: formatCommonTime(order?.shippedAt),
      key: "shippedAt",
    },
    {
      label: "Đánh giá",
      time: undefined,
      key: "review",
    },
  ];

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={5}
        connector={<ColorlibConnector />}
      >
        {steps.map((step) => (
          <Step key={step.key}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <StatusStepOrder label={step.label} time={step.time} />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default CustomizedSteppers;
