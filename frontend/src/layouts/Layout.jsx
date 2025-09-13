import Header from "@/layouts/Header";

function Layout({ title, children }) {
  return (
    <>
      <Header title={title} />

      <main style={{ backgroundColor: "#ffdaf9ff" }}>{children}</main>
    </>
  );
}

export default Layout;
