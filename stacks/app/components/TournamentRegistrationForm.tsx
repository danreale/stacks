import {
  Form,
  useNavigation,
  useActionData,
  Link,
  useParams,
} from "@remix-run/react";

export default function TournamentRegistrationForm() {
  const data = useActionData<typeof action>();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          method="post"
          className="grid justify-center items-center text-center space-y-5"
        >
          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="space-x-2">
            <input
              type="tel"
              className="border-2 border-green-700 rounded"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              maxLength={10}
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            />
          </div>

          <div>
            <button
              disabled={isSubmitting}
              className="px-1 border-2 rounded border-blue-500"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>

          {data && (
            <>
              <div className="flex-col justify-center text-center">
                <p className="text-green-800 py-1">{`You have been registered!`}</p>
                <p className="text py-1">{`Please save this confirmation id.`}</p>
                <p className="text py-1">{`You will need to present this to the manager.`}</p>
                <p className="text-red-500 py-10">{`${data.message}`}</p>
                <Link
                  to={`/tournaments/details/${params.id}`}
                  className="underline text-blue-500"
                >
                  View Tournament Details
                </Link>
              </div>

              <div className="flex-col justify-center text-center">
                <Link to={`/tournaments`} className="underline text-blue-500">
                  Tournament Home
                </Link>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  );
}
