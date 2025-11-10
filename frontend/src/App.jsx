import { useEffect, useMemo, useState } from 'react';

const WS_URL = 'ws://localhost:8080/ws/notifications';

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ title: '', body: '' });
  const [status, setStatus] = useState({ label: 'Connecting...', variant: 'connecting' });

  const isFormValid = useMemo(() => form.title.trim() && form.body.trim(), [form]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => setStatus({ label: 'Connected', variant: 'connected' });
    ws.onclose = () => setStatus({ label: 'Disconnected', variant: 'disconnected' });
    ws.onerror = () => setStatus({ label: 'Error (check console)', variant: 'error' });

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setNotifications((current) => [payload, ...current]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    setForm({ title: '', body: '' });
  };

  return (
    <div className="app">
      <header>
        <h1>Realtime Notifications</h1>
        <p>
          Status: <span className={`status ${status.variant}`}>{status.label}</span>
        </p>
      </header>

      <section className="controls">
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="e.g. Deployment"
            />
          </label>
          <label>
            Message
            <textarea
              value={form.body}
              onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
              placeholder="Describe the notification"
              rows={3}
            />
          </label>
          <button type="submit" disabled={!isFormValid}>
            Broadcast notification
          </button>
        </form>
      </section>

      <section className="feed">
        <h2>Incoming notifications</h2>
        {notifications.length === 0 && <p>No notifications yet. Trigger one using the form above.</p>}
        <ul>
          {notifications.map((notification, index) => (
            <li key={`${notification.title}-${index}`}>
              <h3>{notification.title}</h3>
              <p>{notification.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
