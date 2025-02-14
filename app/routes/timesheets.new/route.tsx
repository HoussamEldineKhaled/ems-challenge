import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

import type { ActionFunction } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); // <select /> input with name="employee_id"
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const work_hours = formData.get("work_hours");
  const break_hours = formData.get("break_hours");

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time, work_hours, break_hours) VALUES (?, ?, ?, ?, ?)',
    [employee_id, start_time, end_time, work_hours, break_hours]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); // Used to create a select input
  return (
    <div>
      <h1>Create New Timesheet</h1>
      <Form method="post">
        <div>
          <label htmlFor="employee_id">Select Employee</label>
          <select name="employee_id" id="employee_id">
            <option value="">--Choose Employee--</option>
            {employees.map((employee : any) => (<option value={employee.id}>{employee.full_name}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input type="datetime-local" name="start_time" id="start_time" required />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" name="end_time" id="end_time" required />
        </div>
        <div>
          <label htmlFor="work_hours">Work Hours</label>
          <input type="number" name="work_hours" id="work_hours" />
        </div>
        <div>
          <label htmlFor="break_hours">Break Hours</label>
          <input type="number" name="break_hours" id="break_hours"/>
        </div>
        <button type="submit">Create Timesheet</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}
