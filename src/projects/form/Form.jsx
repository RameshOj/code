const Form = () => {
  return (
    <div style={{ scroll: "auto" }}>
      <iframe
        id="JotFormIFrame-243075443573458"
        title="Customer Satisfaction Survey Form"
        onLoad={window.parent.scrollTo(0, 0)}
        allowTransparency="true"
        allow="geolocation; microphone; camera; fullscreen"
        src="https://form.jotform.com/243075443573458"
        // frameBorder="0"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "1130px",
          border: "none",
        }}
        scrolling="no"
      ></iframe>
      <script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"></script>
      <script>
        window.jotformEmbedHandler("iframe[id='JotFormIFrame-243075443573458']",
        "https://form.jotform.com/")
      </script>
    </div>
  );
};

export default Form;
