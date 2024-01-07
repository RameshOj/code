import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import styles from "./Markdown.module.css";
import { marked } from "marked";

const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Cute Dog](https://picsum.photos/id/237/200/300)

`;

const Markdown = () => {
  const [textValue, setTextValue] = useState<string>(initialText);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const home = `< Home`;

  return (
    <>
      <a id={styles.a} href="/">
        {home}
      </a>
      <div className={styles.markdownContainer}>
        <Editor value={textValue} onChange={changeHandler} />
        <Preview toModifyData={textValue} />
      </div>
    </>
  );
};

const smiley = "(*_*)";
const pray = "_/\\_";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.headerContainer}>
      <div>
        {smiley} {title}
      </div>
      <div>{pray}</div>
    </div>
  );
};

type EditorProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <div className={styles.editorContainer}>
      <Header title="Editor" />
      <textarea id={styles.editor} value={value} onChange={onChange} />
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
    <div className={styles.previewContainer}>
      <Header title="Preview" />
      <div id={styles.preview} dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default Markdown;
