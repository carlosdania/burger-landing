#!/bin/bash
# Helper: Call Autopilots MCP API with proper session handling
# Usage: ./autopilots-call.sh <method> <params_json>

API_URL="https://mcp.dania.ai/autopilots"
API_KEY="dania_1251fc3be3e86047a6c8a12ab46c7b2ce25d6eb0bf486767b07438083c9be552"
SESSION_FILE="/tmp/autopilots_session.txt"

# Initialize session if needed
init_session() {
  SESSION_ID=$(curl -s -D - --max-time 10 -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" \
    -H "X-API-Key: $API_KEY" \
    -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"dan-agent","version":"1.0"}},"id":1}' \
    "$API_URL" 2>&1 | grep -i "mcp-session-id" | awk '{print $2}' | tr -d '\r')

  echo "$SESSION_ID" > "$SESSION_FILE"

  # Send initialized notification
  curl -s --max-time 5 -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" \
    -H "X-API-Key: $API_KEY" \
    -H "Mcp-Session-Id: $SESSION_ID" \
    -d '{"jsonrpc":"2.0","method":"notifications/initialized","params":{}}' \
    "$API_URL" > /dev/null 2>&1
}

# Get or create session
if [ -f "$SESSION_FILE" ]; then
  SESSION_ID=$(cat "$SESSION_FILE")
else
  init_session
fi

METHOD="$1"
PARAMS="$2"
ID="${3:-99}"

# Make the call
RESPONSE=$(curl -s --max-time 120 -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "X-API-Key: $API_KEY" \
  -H "Mcp-Session-Id: $SESSION_ID" \
  -d "{\"jsonrpc\":\"2.0\",\"method\":\"$METHOD\",\"params\":$PARAMS,\"id\":$ID}" \
  "$API_URL" 2>&1)

# Check if session expired
if echo "$RESPONSE" | grep -q "not initialized"; then
  init_session
  SESSION_ID=$(cat "$SESSION_FILE")
  RESPONSE=$(curl -s --max-time 120 -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" \
    -H "X-API-Key: $API_KEY" \
    -H "Mcp-Session-Id: $SESSION_ID" \
    -d "{\"jsonrpc\":\"2.0\",\"method\":\"$METHOD\",\"params\":$PARAMS,\"id\":$ID}" \
    "$API_URL" 2>&1)
fi

echo "$RESPONSE"
