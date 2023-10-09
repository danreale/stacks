import { Form, useNavigation } from "@remix-run/react";

export default function CloseWaitingList() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  return (
    <>
      <Form method="patch">
        <div>
          <button className="border-2 border-red-500 px-2 rounded">
            {isSubmitting ? "Closing..." : "Close All Lists"}
          </button>
        </div>
      </Form>
    </>
  );
}
