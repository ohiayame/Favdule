import Layout from "@/layouts/Layout";
import { useEffect, useState } from "react";
import { getUserGroups } from "@/api/groupsApi";

function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const id = 1;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const resGroups = await getUserGroups(id);
        setGroups(resGroups);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchGroups();
  }, [id]);

  console.log(groups);

  return (
    <Layout title="Groups">
      <p>Groups</p>
      <ul>
        {groups.map((group) => (
          <li>
            <p>{group.group_name}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default GroupsPage;
