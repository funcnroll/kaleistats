function TokenRow({ uuid, status, expireDate }) {
  return (
    <tr className="border-b border-neutral-800">
      <td>{uuid}</td>
      <td>{status}</td>
      <td>{expireDate}</td>
      <td>
        <button>Action</button>
      </td>
    </tr>
  );
}

export default TokenRow;
