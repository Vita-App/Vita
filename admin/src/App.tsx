import Header from "./components/Header";

const App = () => {
  const onChangeTheme = () => {};

  return (
    <>
      <Header onThemeChange={onChangeTheme} />
      <div className="App">Hello World</div>
    </>
  );
};

export default App;
