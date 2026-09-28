import requests
import streamlit as st

API_URL = "http://127.0.0.1:8000/chat/"
DEFAULT_MODEL = "openai/gpt-oss-20b"

st.set_page_config(
    page_title="NEXUS",
    page_icon="✦",
    layout="wide",
)

st.markdown(
    """
    <style>
        .main {
            background: #080808;
        }

        .nexus-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.2rem;
        }

        .nexus-subtitle {
            color: #94a3b8;
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .model-box {
            padding: 1rem;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }

        .user-label {
            color: #22d3ee;
            font-weight: 700;
        }

        .assistant-label {
            color: #94a3b8;
            font-weight: 700;
        }
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    '<div class="nexus-title">NEXUS Chat</div>',
    unsafe_allow_html=True,
)

st.markdown(
    '<div class="nexus-subtitle">'
    'Advanced Python-based LLM application platform'
    '</div>',
    unsafe_allow_html=True,
)

st.markdown(
    f"""
    <div class="model-box">
        <strong>Active Model</strong><br>
        <code>{DEFAULT_MODEL}</code>
    </div>
    """,
    unsafe_allow_html=True,
)

if "messages" not in st.session_state:
    st.session_state.messages = []

col1, col2 = st.columns([5, 1])

with col2:
    if st.button("Clear Chat", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

for message in st.session_state.messages:

    if message["role"] == "user":
        with st.chat_message("user"):
            st.markdown(message["content"])

    else:
        with st.chat_message("assistant"):
            st.markdown(message["content"])


prompt = st.chat_input("Ask NEXUS anything...")

if prompt:

    st.session_state.messages.append(
        {
            "role": "user",
            "content": prompt,
        }
    )

    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):

        with st.spinner("NEXUS is generating a response..."):

            try:
                response = requests.post(
                    API_URL,
                    json={
                        "message": prompt,
                        "model": DEFAULT_MODEL,
                    },
                    timeout=120,
                )

                data = response.json()

                if not response.ok:
                    error = data.get(
                        "detail",
                        f"API error: {response.status_code}",
                    )
                    raise RuntimeError(error)

                answer = data.get("response")

                if not answer:
                    raise RuntimeError(
                        "The API returned an empty response."
                    )

                # Convert common LaTeX block delimiters
                # into Streamlit-friendly math formatting.
                answer = answer.replace("\\[", "$$")
                answer = answer.replace("\\]", "$$")

                st.markdown(answer)

                st.session_state.messages.append(
                    {
                        "role": "assistant",
                        "content": answer,
                    }
                )

            except requests.exceptions.ConnectionError:
                st.error(
                    "Cannot connect to the NEXUS Python API. "
                    "Make sure the FastAPI backend is running "
                    "on http://127.0.0.1:8000."
                )

            except Exception as error:
                st.error(f"Request error: {error}")

st.divider()

st.caption(
    "NEXUS • Python Frontend • FastAPI • Groq • LLM"
)