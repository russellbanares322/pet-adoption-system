import { Modal } from "antd";
import { Ref } from "react";
import { AdoptionsData } from "../../api/adoptions/adoptions";
import PrintPageLayout from "./PrintPageLayout";

type AdoptionApplicationLayoutModalProps = {
  open: boolean;
  onCancel: () => void;
  data: AdoptionsData;
  elementToBePrintedRef: Ref<HTMLDivElement>;
};

const AdoptionApplicationLayoutModal = ({
  open,
  onCancel,
  data,
  elementToBePrintedRef,
}: AdoptionApplicationLayoutModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel}>
      <PrintPageLayout ref={elementToBePrintedRef}>
        {JSON.stringify(data)}
      </PrintPageLayout>
    </Modal>
  );
};

export default AdoptionApplicationLayoutModal;
