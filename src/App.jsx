import { useState } from "react";
import {
  Inbox,
  Send,
  Star,
  Trash2,
  Search,
  Plus,
  Sparkles,
  Mail,
  X,
  Reply,
} from "lucide-react";

const initialEmails = [
  {
    id: 1,
    sender: "HR Team",
    email: "hr@company.com",
    subject: "Interview Process Update",
    preview: "Your next interview round has been scheduled.",
    body: "Hello,\n\nYour next interview round has been scheduled. Please check the details and prepare accordingly.\n\nRegards,\nHR Team",
    time: "10:30 AM",
    unread: true,
    category: "Work",
  },
  {
    id: 2,
    sender: "GitHub",
    email: "noreply@github.com",
    subject: "Your repository activity",
    preview: "There has been new activity in your repository.",
    body: "Your repository has received new activity. Open GitHub to view the latest updates.",
    time: "Yesterday",
    unread: false,
    category: "Updates",
  },
  {
    id: 3,
    sender: "Project Team",
    email: "team@project.com",
    subject: "Project Meeting",
    preview: "Let us discuss the project progress today.",
    body: "Our project meeting is scheduled for today. Please bring your latest progress updates.",
    time: "Monday",
    unread: false,
    category: "Work",
  },
  {
    id: 4,
    sender: "Learning Platform",
    email: "learn@example.com",
    subject: "New course recommendations",
    preview: "Explore new courses to improve your skills.",
    body: "We found some new courses that may help you improve your technical and professional skills.",
    time: "Sunday",
    unread: false,
    category: "Learning",
  },
];

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [showCompose, setShowCompose] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [sentEmails, setSentEmails] = useState([]);
  const [starredEmails, setStarredEmails] = useState([]);
  const [compose, setCompose] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const unreadCount = emails.filter((email) => email.unread).length;

  const displayedEmails =
    activeFolder === "Sent"
      ? sentEmails
      : activeFolder === "Starred"
      ? emails.filter((email) => starredEmails.includes(email.id))
      : activeFolder === "Trash"
      ? []
      : emails;

  const filteredEmails = displayedEmails.filter((email) => {
    const searchText = search.toLowerCase();

    return (
      email.sender.toLowerCase().includes(searchText) ||
      email.subject.toLowerCase().includes(searchText) ||
      email.preview.toLowerCase().includes(searchText) ||
      email.body.toLowerCase().includes(searchText)
    );
  });

  function openEmail(email) {
    setSelectedEmail(email);

    setEmails((currentEmails) =>
      currentEmails.map((item) =>
        item.id === email.id ? { ...item, unread: false } : item
      )
    );
  }

  function toggleStar(emailId) {
    setStarredEmails((current) =>
      current.includes(emailId)
        ? current.filter((id) => id !== emailId)
        : [...current, emailId]
    );
  }

  function sendEmail(event) {
    event.preventDefault();

    const newSentEmail = {
      id: Date.now(),
      sender: "Me",
      email: "me@example.com",
      subject: compose.subject,
      preview: compose.body.slice(0, 80),
      body: compose.body,
      time: "Just now",
      unread: false,
      category: "Sent",
      to: compose.to,
    };

    setSentEmails((current) => [newSentEmail, ...current]);
    setShowCompose(false);
    setCompose({ to: "", subject: "", body: "" });

    alert(
      "Demo Mode: Email prepared successfully. No real email was sent."
    );
  }

  function generateDemoEmail() {
    setCompose({
      to: "team@company.com",
      subject: "Project Progress Update",
      body: `Hello Team,

Here is the latest update regarding our project progress.

The current development tasks are progressing well. We will share the next update soon.

Regards,
Pragadeesh`,
    });

    setShowCompose(true);
    setShowAssistant(false);
  }

  function searchInterviewEmails() {
    setSearch("interview");
    setActiveFolder("Inbox");
    setShowAssistant(false);
  }

  function clearSearch() {
    setSearch("");
  }

  function handleAssistantCommand(event) {
    event.preventDefault();

    const command = assistantQuery.trim().toLowerCase();

    if (command === "find interview emails" || command === "search interview") {
      setSearch("interview");
      setActiveFolder("Inbox");
      setAssistantResponse("I found interview-related emails.");
    } else if (command === "show starred emails") {
      setActiveFolder("Starred");
      setAssistantResponse("I opened your starred emails.");
    } else if (command === "draft project update") {
      setCompose({
        to: "team@company.com",
        subject: "Project Progress Update",
        body: `Hello Team,

Here is the latest update regarding our project progress.

The current development tasks are progressing well. We will share the next update soon.

Regards,
Pragadeesh`,
      });
      setShowCompose(true);
      setAssistantResponse("I prepared a professional project update draft.");
    } else if (command === "compose email") {
      setCompose({ to: "", subject: "", body: "" });
      setShowCompose(true);
      setAssistantResponse("I opened a new email draft for you.");
    } else if (command === "open hr email") {
      const hrEmail = emails.find(
        (email) => email.subject.toLowerCase() === "interview process update"
      );

      if (hrEmail) {
        openEmail(hrEmail);
        setAssistantResponse("I opened the HR email.");
      }
    } else {
      setAssistantResponse(
        "Try: find interview emails, show starred emails, or draft project update."
      );
    }

    setAssistantQuery("");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <Mail size={25} />
          <span>MailPilot AI</span>
        </div>

        <button
          className="compose-btn"
          onClick={() => setShowCompose(true)}
        >
          <Plus size={18} />
          Compose
        </button>

        <nav>
          <button
            className={`nav-item ${
              activeFolder === "Inbox" ? "active" : ""
            }`}
            onClick={() => {
              setActiveFolder("Inbox");
              setSelectedEmail(null);
            }}
          >
            <Inbox size={18} />
            Inbox
            <span>{unreadCount}</span>
          </button>

          <button
            className={`nav-item ${
              activeFolder === "Sent" ? "active" : ""
            }`}
            onClick={() => {
              setActiveFolder("Sent");
              setSelectedEmail(null);
            }}
          >
            <Send size={18} />
            Sent
          </button>

          <button
            className={`nav-item ${
              activeFolder === "Starred" ? "active" : ""
            }`}
            onClick={() => {
              setActiveFolder("Starred");
              setSelectedEmail(null);
            }}
          >
            <Star size={18} />
            Starred
          </button>

          <button
            className={`nav-item ${
              activeFolder === "Trash" ? "active" : ""
            }`}
            onClick={() => {
              setActiveFolder("Trash");
              setSelectedEmail(null);
            }}
          >
            <Trash2 size={18} />
            Trash
          </button>
        </nav>

        <div className="demo-label">● Demo Mode</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activeFolder}</h1>
            <p>Your intelligent email workspace</p>
          </div>

          <button
            className="assistant-btn"
            onClick={() => setShowAssistant(!showAssistant)}
          >
            <Sparkles size={18} />
            AI Assistant
          </button>
        </header>

        <div className="search-box">
          <Search size={19} />

          <input
            placeholder="Search emails..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              onClick={clearSearch}
              style={{
                border: "none",
                background: "transparent",
                color: "#94a3b8",
              }}
            >
              <X size={17} />
            </button>
          )}
        </div>

        <section className="email-list">
          {filteredEmails.length === 0 ? (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              <Mail size={40} />
              <h3>No emails found</h3>
              <p>Try another search or select a different folder.</p>
            </div>
          ) : (
            filteredEmails.map((email) => (
              <div
                className={`email-card ${
                  email.unread ? "unread" : ""
                }`}
                key={email.id}
                style={{ position: "relative" }}
              >
                <button
                  onClick={() => openEmail(email)}
                  style={{
                    display: "flex",
                    flex: 1,
                    gap: "15px",
                    textAlign: "left",
                    color: "inherit",
                    background: "transparent",
                    border: "none",
                    minWidth: 0,
                  }}
                >
                  <div className="avatar">
                    {email.sender.charAt(0).toUpperCase()}
                  </div>

                  <div className="email-content">
                    <div className="email-header">
                      <strong>{email.sender}</strong>
                      <span>{email.time}</span>
                    </div>

                    <h3>{email.subject}</h3>
                    <p>{email.preview}</p>
                  </div>
                </button>

                <button
                  onClick={() => toggleStar(email.id)}
                  title="Star email"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: starredEmails.includes(email.id)
                      ? "#fbbf24"
                      : "#64748b",
                    padding: "5px",
                  }}
                >
                  <Star
                    size={18}
                    fill={
                      starredEmails.includes(email.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>
            ))
          )}
        </section>
      </main>

      {selectedEmail && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setSelectedEmail(null)}
            >
              <X size={22} />
            </button>

            <span className="small-label">EMAIL DETAILS</span>

            <h2>{selectedEmail.subject}</h2>

            <p className="sender">
              From: {selectedEmail.sender} &lt;{selectedEmail.email}&gt;
            </p>

            <hr />

            <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
              {selectedEmail.body}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "25px",
              }}
            >
              <button
                className="send-btn"
                onClick={() => {
                  setCompose({
                    to: selectedEmail.email,
                    subject: `Re: ${selectedEmail.subject}`,
                    body: "",
                  });
                  setSelectedEmail(null);
                  setShowCompose(true);
                }}
              >
                <Reply size={17} />
                Reply
              </button>

              <button
                className="assistant-btn"
                onClick={() => {
                  setSelectedEmail(null);
                  setShowAssistant(true);
                }}
              >
                <Sparkles size={17} />
                AI Actions
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompose && (
        <div className="modal-overlay">
          <form className="modal compose-modal" onSubmit={sendEmail}>
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowCompose(false)}
            >
              <X size={22} />
            </button>

            <span className="small-label">NEW MESSAGE</span>

            <h2>Compose Email</h2>

            <input
              required
              type="email"
              placeholder="To"
              value={compose.to}
              onChange={(event) =>
                setCompose({
                  ...compose,
                  to: event.target.value,
                })
              }
            />

            <input
              required
              placeholder="Subject"
              value={compose.subject}
              onChange={(event) =>
                setCompose({
                  ...compose,
                  subject: event.target.value,
                })
              }
            />

            <textarea
              required
              placeholder="Write your message..."
              rows="8"
              value={compose.body}
              onChange={(event) =>
                setCompose({
                  ...compose,
                  body: event.target.value,
                })
              }
            />

            <button className="send-btn" type="submit">
              <Send size={17} />
              Prepare Email
            </button>

            <p
              style={{
                color: "#fbbf24",
                fontSize: "12px",
                margin: 0,
              }}
            >
              Demo Mode: This form does not send a real email.
            </p>
          </form>
        </div>
      )}

      {showAssistant && (
        <div className="assistant-panel">
          <div className="assistant-title">
            <Sparkles size={20} />
            <strong>AI Assistant</strong>
          </div>

          <p>
            Choose an action. These are working demo actions using local
            email data.
          </p>

          <form onSubmit={handleAssistantCommand}>
            <input
              aria-label="Ask MailPilot AI"
              placeholder="Ask MailPilot AI to search, compose, or open an email..."
              value={assistantQuery}
              onChange={(event) => setAssistantQuery(event.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px",
                border: "1px solid #3b4964",
                borderRadius: "10px",
                outline: "none",
                color: "#ffffff",
                background: "#1e293b",
              }}
            />

            <button type="submit">
              <Send size={16} />
              Send
            </button>
          </form>

          {assistantResponse && (
            <p style={{ marginBottom: 0 }}>{assistantResponse}</p>
          )}

          <button onClick={generateDemoEmail}>
            <Sparkles size={16} />
            Draft a project update email
          </button>

          <button onClick={searchInterviewEmails}>
            <Search size={16} />
            Find interview emails
          </button>

          <button
            onClick={() => {
              setActiveFolder("Starred");
              setShowAssistant(false);
            }}
          >
            <Star size={16} />
            Show starred emails
          </button>

          <button
            onClick={() => {
              setCompose({
                to: "",
                subject: "Meeting Request",
                body: "Hello,\n\nI would like to schedule a meeting to discuss the project.\n\nRegards,\nPragadeesh",
              });
              setShowCompose(true);
              setShowAssistant(false);
            }}
          >
            <Mail size={16} />
            Create a meeting email
          </button>
        </div>
      )}
    </div>
  );
}

export default App;