import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const secondary_number = formData.get("secondary_number");
  const password = formData.get("pasword");
  const date_of_birth = formData.get("date_of_birth");
  const gender = formData.get("gender");
  const nationality = formData.get("nationality");

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone_number, secondary_number, pasword, date_of_birth, gender, nationality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [full_name, email, phone_number, secondary_number, password, date_of_birth, gender, nationality]
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div>
      <h1>Create New Employee</h1>
      <Form method="post">
        <div>
          <label htmlFor="full_name">Full Name </label>
          <input type="text" name="full_name" id="full_name" required />
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input type="email" name="email" id="full_name" required/>
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number </label>
          <input type="tel" name="phone_number" id="phone_number" required/>
        </div>
        <div>
          <label htmlFor="secondary_number">Secondary Number </label>
          <input type="tel" name="secondary_number" id="secondary_number"/>
        </div>
        <div>
          <label htmlFor="pasword">Password </label>
          <input type="password" name="pasword" id="pasword" required/>
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth </label>
          <input type="date" name="date_of_birth" id="date_of_birth" required/>
        </div>
        <div>
          <label htmlFor="gender">
            <input type="radio" name="gender" id="female" value="F"/>
            Female&nbsp;
          </label>
          <label htmlFor="gender">
            <input type="radio" name="gender" id="male" value="M"/>
            Male&nbsp;
          </label>
          <label htmlFor="gender">
            <input type="radio" name="gender" id="other" value="O"/>
            Other&nbsp;
          </label>
          
        </div>
        <div>
          <label htmlFor="nationality">
            Nationality
            <select name="nationality" id="nationality" required>
              <option value="Lebanon">Lebanon</option>
              <option value="Syria">Syria</option>
              <option value="Palestine">Palestine</option>
              <option value="Jordon">Jordon</option>
              <option value="USA">USA</option>
              <option value="France">France</option>
              <option value="UK">United Kingdom</option>
              <option value="Iraq">Iraq</option>
              <option value="Canada">Canada</option>
            </select>
          </label>
        </div>
        <button type="submit">Create Employee</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}
