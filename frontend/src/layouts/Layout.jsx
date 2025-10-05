import Header from "@/layouts/Header";

function Layout({ title, children, groupId, onFilterChange }) {
  return (
    <>
      <Header title={title} groupId={groupId} onFilterChange={onFilterChange} />

      <main>{children}</main>
    </>
  );
}

export default Layout;
