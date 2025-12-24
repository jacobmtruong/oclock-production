import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { isAdminFromToken } from "../../lib/adminAuth";

const CATEGORIES = ["food", "beverage", "product", "architecture", "lifestyle"];
const VIEWS = ["landscape", "portrait"];

// ✅ 4 thumbnail slots for PortfolioBoard
const BOARD_KEYS = [
  { key: "fnb", label: "Thumbnail: Food & Beverage" },
  { key: "product", label: "Thumbnail: Product" },
  { key: "architecture", label: "Thumbnail: Architecture" },
  { key: "lifestyle", label: "Thumbnail: Lifestyle" },
];

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    url: "",
    content: "Food Photography",
    category: "food",
    view: "landscape",
    favorite: false,
  });

  // lightbox
  const [lightboxUrl, setLightboxUrl] = useState("");
  const [lightboxTitle, setLightboxTitle] = useState("");

  // table helpers
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewFilter, setViewFilter] = useState("all");

  const total = useMemo(() => photos.length, [photos]);

  const load = async () => {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/admin/photos");
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setMsg(data.message || "Failed to load photos");
      return;
    }

    setPhotos(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.url.trim()) return setMsg("Image URL is required.");

    const res = await fetch("/api/admin/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.message || "Failed to add photo");

    setForm({
      url: "",
      content: "Food Photography",
      category: "food",
      view: "landscape",
      favorite: false,
    });

    await load();
  };

  const del = async (id) => {
    if (!confirm("Delete this photo?")) return;

    setMsg("");
    const res = await fetch(`/api/admin/photos?id=${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) return setMsg(data.message || "Failed to delete");

    setPhotos((prev) => prev.filter((p) => p._id !== id));
  };

  const logout = async () => {
    window.location.href = "/admin/login";
  };

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return photos.filter((p) => {
      const okCategory =
        categoryFilter === "all" ? true : p.category === categoryFilter;
      const okView = viewFilter === "all" ? true : p.view === viewFilter;

      if (!okCategory || !okView) return false;
      if (!query) return true;

      const hay = `${p.content || ""} ${p.category || ""} ${p.view || ""} ${
        p.url || ""
      }`.toLowerCase();
      return hay.includes(query);
    });
  }, [photos, q, categoryFilter, viewFilter]);

  // ✅ Current selected thumbnails (4)
  const selectedThumbs = useMemo(() => {
    const map = {};
    for (const slot of BOARD_KEYS) map[slot.key] = null;
    for (const p of photos) {
      if (p.boardKey && map[p.boardKey] === null) map[p.boardKey] = p;
    }
    return map;
  }, [photos]);

  const openLightbox = (url, title) => {
    setLightboxUrl(url);
    setLightboxTitle(title || "");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxUrl("");
    setLightboxTitle("");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ Assign / unassign a thumbnail slot
  const setBoardKey = async (id, boardKey) => {
    setMsg("");

    const res = await fetch("/api/admin/photos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, boardKey }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.message || "Failed to update thumbnail");

    // reload to reflect "only one per slot"
    await load();
  };

  return (
    <>
      <Head>
        <title>Admin Photos | O&apos;CLOCK</title>
      </Head>

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: 18,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1100px, 96vw)",
              maxHeight: "92vh",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(10,10,10,0.92)",
              boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div
                style={{
                  color: "white",
                  opacity: 0.9,
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Preview {lightboxTitle ? `· ${lightboxTitle}` : ""}
              </div>

              <button onClick={closeLightbox} style={btnGhost}>
                Close (Esc)
              </button>
            </div>

            <div style={{ padding: 14 }}>
              <img
                src={lightboxUrl}
                alt={lightboxTitle || "Preview"}
                style={{
                  width: "100%",
                  maxHeight: "76vh",
                  objectFit: "contain",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "black",
                }}
              />
              <div style={{ marginTop: 10 }}>
                <a
                  href={lightboxUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "white",
                    opacity: 0.8,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Open original
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ minHeight: "100vh", background: "black", color: "white" }}>
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <div className="wrap">
            <div className="headerRow">
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Admin · Photos
                </h1>
                <p style={{ margin: "8px 0 0 0", opacity: 0.7, fontSize: 13 }}>
                  Total photos: <b style={{ opacity: 1 }}>{total}</b>
                  {filtered.length !== total ? (
                    <>
                      {" "}
                      · Showing <b style={{ opacity: 1 }}>{filtered.length}</b>
                    </>
                  ) : null}
                </p>
              </div>

              <div className="headerActions">
                <button style={btnGhost} onClick={load}>
                  Refresh
                </button>
                <button style={btnGhost} onClick={logout}>
                  Back to Login
                </button>
              </div>
            </div>

            {/* ✅ Thumbnail slots panel */}
            <div
              style={{
                marginTop: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                padding: 12,
                display: "grid",
                gap: 10,
              }}
            >
              <div
                style={{
                  opacity: 0.9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                Portfolio board thumbnails (choose 1 per slot)
              </div>

              <div className="thumbGrid">
                {BOARD_KEYS.map((slot) => {
                  const p = selectedThumbs[slot.key];
                  return (
                    <div
                      key={slot.key}
                      style={{
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: 14,
                        padding: 10,
                        minHeight: 200,
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          opacity: 0.85,
                          letterSpacing: "0.10em",
                          textTransform: "uppercase",
                        }}
                      >
                        {slot.label.replace("Thumbnail: ", "")}
                      </div>

                      {p ? (
                        <button
                          type="button"
                          onClick={() => openLightbox(p.url, slot.label)}
                          style={{
                            padding: 0,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          title="Click to preview"
                        >
                          <img
                            src={p.url}
                            alt={slot.label}
                            style={{
                              width: "100%",
                              height: 160,
                              objectFit: "cover",
                              borderRadius: 12,
                              border: "1px solid rgba(255,255,255,0.12)",
                              display: "block",
                            }}
                          />
                        </button>
                      ) : (
                        <div style={{ opacity: 0.55, fontSize: 13 }}>
                          Not selected yet
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search / Filters */}
            <div className="filtersRow">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by content, url, category..."
                style={inputDark}
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={selectDark}
              >
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={viewFilter}
                onChange={(e) => setViewFilter(e.target.value)}
                style={selectDark}
              >
                <option value="all">All views</option>
                {VIEWS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <button
                style={btnGhost}
                onClick={() => {
                  setQ("");
                  setCategoryFilter("all");
                  setViewFilter("all");
                }}
              >
                Reset
              </button>
            </div>

            {msg && (
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 12px",
                  border: "1px solid rgba(255,80,80,0.35)",
                  borderRadius: 12,
                  color: "#ffb4b4",
                }}
              >
                {msg}
              </div>
            )}
          </div>
        </div>

        <div className="wrap" style={{ paddingBottom: 40 }}>
          {/* Add Form */}
          <form
            onSubmit={add}
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              padding: 16,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  opacity: 0.9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                Add new photo
              </div>
              <button type="submit" style={btnPrimary}>
                Add Photo
              </button>
            </div>

            <div className="formGrid">
              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelSmall}>Image URL *</label>
                <input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                  style={inputDark}
                />
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelSmall}>Content</label>
                <select
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  style={selectDark}
                >
                  <option value="Food Photography">Food Photography</option>
                  <option value="Beverage Photography">
                    Beverage Photography
                  </option>
                  <option value="Product Photography">
                    Product Photography
                  </option>
                  <option value="Architecture Photography">
                    Architecture Photography
                  </option>
                  <option value="Lifestyle Photography">
                    Lifestyle Photography
                  </option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={selectDark}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={form.view}
                onChange={(e) => setForm({ ...form, view: e.target.value })}
                style={selectDark}
              >
                {VIEWS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <label
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  opacity: 0.85,
                }}
              >
                <input
                  type="checkbox"
                  checked={form.favorite}
                  onChange={(e) =>
                    setForm({ ...form, favorite: e.target.checked })
                  }
                  style={{ transform: "translateY(1px)" }}
                />
                favorite
              </label>

              {form.url?.trim() ? (
                <button
                  type="button"
                  style={btnGhost}
                  onClick={() => openLightbox(form.url, "New photo preview")}
                >
                  Preview URL
                </button>
              ) : null}
            </div>
          </form>

          {/* Table + Cards */}
          <div style={{ marginTop: 16 }}>
            {loading ? (
              <p style={{ opacity: 0.8 }}>Loading...</p>
            ) : filtered.length === 0 ? (
              <p style={{ opacity: 0.8 }}>No photos found.</p>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="tableWrap">
                  <div
                    style={{
                      overflowX: "auto",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: 1180,
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={thDark}>Preview</th>
                          <th style={thDark}>Category</th>
                          <th style={thDark}>View</th>
                          <th style={thDark}>Fav</th>
                          <th style={thDark}>Content</th>
                          <th style={thDark}>Board</th>
                          <th style={thDark}>Link</th>
                          <th style={thDark}>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filtered.map((p) => (
                          <tr
                            key={p._id}
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.10)",
                            }}
                          >
                            <td style={tdDark}>
                              <button
                                type="button"
                                onClick={() =>
                                  openLightbox(
                                    p.url,
                                    `${p.category} · ${p.view}`
                                  )
                                }
                                style={{
                                  padding: 0,
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                }}
                                title="Click to preview"
                              >
                                <img
                                  src={p.url}
                                  alt={p.content || "photo"}
                                  style={{
                                    width: 180,
                                    height: 100,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    display: "block",
                                  }}
                                />
                              </button>
                            </td>

                            <td style={tdDark}>{p.category}</td>
                            <td style={tdDark}>{p.view}</td>
                            <td style={tdDark}>{p.favorite ? "★" : ""}</td>
                            <td style={tdDark} title={p.content || ""}>
                              {p.content || ""}
                            </td>

                            {/* ✅ Thumbnail selector */}
                            <td style={tdDark}>
                              <select
                                value={p.boardKey || ""}
                                onChange={(e) =>
                                  setBoardKey(p._id, e.target.value || null)
                                }
                                style={selectDark}
                                title="Choose thumbnail slot"
                              >
                                <option value="">(not a thumbnail)</option>
                                {BOARD_KEYS.map((s) => (
                                  <option key={s.key} value={s.key}>
                                    {s.label}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td style={tdDark}>
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color: "white",
                                  opacity: 0.75,
                                  textDecoration: "underline",
                                  textUnderlineOffset: 3,
                                }}
                              >
                                open
                              </a>
                            </td>

                            <td style={tdDark}>
                              <button
                                onClick={() => del(p._id)}
                                style={btnDanger}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="cardsWrap">
                  {filtered.map((p) => (
                    <div className="card" key={p._id}>
                      <div className="cardTop">
                        <button
                          type="button"
                          onClick={() =>
                            openLightbox(p.url, `${p.category} · ${p.view}`)
                          }
                          style={{
                            padding: 0,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          title="Click to preview"
                        >
                          <img
                            src={p.url}
                            alt={p.content || "photo"}
                            style={{
                              width: 110,
                              height: 80,
                              objectFit: "cover",
                              borderRadius: 12,
                              border: "1px solid rgba(255,255,255,0.12)",
                              display: "block",
                            }}
                          />
                        </button>

                        <div className="meta">
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              opacity: 0.95,
                            }}
                          >
                            {p.content || "(no content)"}
                          </div>

                          <div className="metaRow">
                            <span>{p.category}</span>
                            <span>·</span>
                            <span>{p.view}</span>
                            {p.favorite ? (
                              <>
                                <span>·</span>
                                <span>★</span>
                              </>
                            ) : null}
                          </div>

                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "white",
                              opacity: 0.75,
                              textDecoration: "underline",
                              textUnderlineOffset: 3,
                              width: "fit-content",
                            }}
                          >
                            open link
                          </a>
                        </div>
                      </div>

                      <div className="cardActions">
                        <select
                          value={p.boardKey || ""}
                          onChange={(e) =>
                            setBoardKey(p._id, e.target.value || null)
                          }
                          style={selectDark}
                        >
                          <option value="">(not a thumbnail)</option>
                          {BOARD_KEYS.map((s) => (
                            <option key={s.key} value={s.key}>
                              {s.label}
                            </option>
                          ))}
                        </select>

                        <button onClick={() => del(p._id)} style={btnDanger}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <p style={{ marginTop: 14, opacity: 0.6, fontSize: 12 }}>
            Tip: Click any thumbnail to preview it larger. Use the “Board”
            dropdown to pick the 4 PortfolioBoard thumbnails.
          </p>
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 16px;
        }

        .headerRow {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
          flex-wrap: wrap;
        }

        .headerActions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .thumbGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .filtersRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .filtersRow > :global(input),
        .filtersRow > :global(select),
        .filtersRow > :global(button) {
          flex: 1 1 180px;
        }

        .formGrid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .thumbGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .headerRow {
            align-items: flex-start;
          }

          .headerActions {
            width: 100%;
          }

          .headerActions > :global(button) {
            flex: 1 1 auto;
          }

          .thumbGrid {
            grid-template-columns: 1fr;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }

          .filtersRow > :global(input) {
            flex-basis: 100%;
          }
        }

        /* Table vs cards */
        .tableWrap {
          display: block;
        }
        .cardsWrap {
          display: none;
        }

        @media (max-width: 820px) {
          .tableWrap {
            display: none;
          }
          .cardsWrap {
            display: grid;
            gap: 10px;
          }
        }

        .card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          padding: 12px;
          display: grid;
          gap: 10px;
        }

        .cardTop {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 12px;
          align-items: start;
        }

        .meta {
          display: grid;
          gap: 6px;
          font-size: 13px;
          opacity: 0.9;
        }

        .metaRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0.85;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cardActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cardActions > :global(button),
        .cardActions > :global(select),
        .cardActions > :global(a) {
          flex: 1 1 160px;
        }
      `}</style>
    </>
  );
}

const labelSmall = {
  fontSize: 12,
  opacity: 0.75,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const inputDark = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  outline: "none",
};

const selectDark = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  outline: "none",
};

const btnGhost = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: 12,
  opacity: 0.9,
};

const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "white",
  color: "black",
  cursor: "pointer",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: 12,
};

const btnDanger = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,80,80,0.35)",
  background: "rgba(255,80,80,0.12)",
  color: "white",
  cursor: "pointer",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: 12,
};

const thDark = {
  textAlign: "left",
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: 14,
  whiteSpace: "nowrap",
  opacity: 0.8,
};

const tdDark = {
  padding: 14,
  verticalAlign: "middle",
  fontSize: 14,
  opacity: 0.92,
};

// ✅ server-side protection
export async function getServerSideProps(context) {
  const token = context.req.cookies?.admin_token || "";
  const ok = isAdminFromToken(token);

  if (!ok) {
    return {
      redirect: { destination: "/admin/login", permanent: false },
    };
  }

  return { props: {} };
}
