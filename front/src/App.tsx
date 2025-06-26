import React, { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listRecords } from "./graphql/queries";
import { createRecord, deleteRecord } from "./graphql/mutations";
import "@aws-amplify/ui-react/styles.css";

type Record = {
  id: string;
  title: string;
  content: string;
};

const client = generateClient();

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [user, setUser] = useState<{ username: string }>({ username: "Guest" });
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchRecords = async () => {
    try {
      const response = await client.graphql({
        query: listRecords,
        authMode: "userPool",
      });
      if ("data" in response && response.data?.listRecords) {
        setRecords(response.data.listRecords);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    const fetchUserAndRecords = async () => {
      try {
        const authUser = await getCurrentUser();
        setUser({ username: authUser.username });
        await fetchRecords();
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchUserAndRecords();
  }, []);

  const handleCreateRecord = async () => {
    if (!title || !content) {
      alert("TitleとContentを入力してください");
      return;
    }

    try {
      await client.graphql({
        query: createRecord,
        variables: {
          input: {
            title,
            content,
          },
        },
        authMode: "userPool",
      });

      await fetchRecords();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating record:", error);
      alert("登録に失敗しました");
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (!window.confirm("このレコードを削除しますか？")) {
      return;
    }

    try {
      await client.graphql({
        query: deleteRecord,
        variables: {
          input: {
            id,
          },
        },
        authMode: "userPool",
      });

      await fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Welcome {user.username}!</h1>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={() => {
          void signOut();
        }}
      >
        Logout
      </button>

      <h2>新規レコード作成</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px", height: "50px" }}
      />
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={handleCreateRecord}
      >
        登録
      </button>

      <h2>Records</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {records.map((record) => (
          <li
            key={record.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px 0",
              position: "relative",
            }}
          >
            <h3>{record.title}</h3>
            <p>{record.content}</p>
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => handleDeleteRecord(record.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuthenticator(App, {
  signUpAttributes: ["email"],
});
