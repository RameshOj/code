import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import "./Markdown.css";
import { marked } from "marked";

const Markdown = () => {
  const [textValue, setTextValue] = useState<string>("");

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="markdownContainer">
      <Editor value={textValue} onChange={changeHandler} />
      <Preview toModifyData={textValue} />
    </div>
  );
};

const smiley = "(*_*)";
const expand = "><";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="headerContainer">
      <div>
        {smiley} {title}
      </div>
      <div>{expand}</div>
    </div>
  );
};

type EditorProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <div className="editorContainer">
      <Header title="Editor" />
      <textarea id="editor" value={value} onChange={onChange} />
    </div>
  );
};

type PreviewProps = {
  toModifyData: string;
};

const Preview = ({ toModifyData }: PreviewProps) => {
  const [data, setData] = useState<string>("");
  const dataModifier = (data: string) => {
    const modifiedData = marked.parse(data);
    return modifiedData;
  };

  useEffect(() => {
    const dataModified = dataModifier(toModifyData);
    setData(dataModified);
  }, [toModifyData]);

  return (
    <div className="previewContainer">
      <Header title="Preview" />
      <div id="preview" dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default Markdown;
