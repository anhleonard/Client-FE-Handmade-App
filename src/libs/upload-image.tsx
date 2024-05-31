import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Typography } from "@mui/material";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type Props = {
  fileList: UploadFile[];
  defaultFileList?: UploadFile[];
  setFileList: any;
};

const UploadImage: React.FC<Props> = ({
  fileList,
  setFileList,
  defaultFileList,
}: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <Typography className="text-sm font-medium text-grey-c900">
        Upload
      </Typography>
    </button>
  );

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <Upload
        customRequest={dummyRequest}
        listType="picture-card"
        defaultFileList={defaultFileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // fileList={fileList}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={previewImage}
          className="max-h-[65vh] object-cover"
        />
      </Modal>
    </>
  );
};

export default UploadImage;
