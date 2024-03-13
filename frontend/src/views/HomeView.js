function HomeView() {
  return (
    <>
      <nav aria-label="Page navigation exampl">
        <ul class="pagination justify-content-center my-5">
          <li class="page-item">
            <a class="page-link" href="#">
              Today
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Tommorrow
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Day after
            </a>
          </li>
        </ul>
      </nav>

      <div class="m-4">
        <table class="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>8-10</th>
              <th>10-12</th>
              <th>12-14</th>
              <th>14-16</th>
              <th>16-18</th>
              <th>18-20</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning">
              <td><button className="btn w-100">Free</button></td>
              <td><button className="btn w-100">Free</button></td>
              <td className="bg-danger"><button className="btn w-100">Reserved <small>by aminmehri</small></button></td>
              <td><button className="btn w-100">Free</button></td>
              <td><button className="btn w-100">Free</button></td>
              <td><button className="btn w-100">Free</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default HomeView;
