import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useState, useEffect } from "react";

export function Account() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (isConnected) {
    return (
      <div
        style={{
          backgroundColor: "indigo",
          borderRadius: "30px",
          padding: "12px",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", paddingLeft: "8px" }}
        >
          <div style={{ paddingRight: "20px", color: "white" }}>
            {connector?.name}
          </div>
          <div style={{ paddingRight: "20px", color: "white" }}>
            {address!.substring(0, 12) + "..."}
          </div>
        </div>

        <button
          style={{ paddingTop: "10px", color: "white", fontWeight: "bold" }}
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          style={{
            backgroundColor: "black",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
            borderRadius: "8px",
            color: "white",
          }}
        >
          Connect with {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
