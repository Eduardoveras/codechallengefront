import React from "react";

export default () => (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Some Notes Regarding This Project</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ul>
                        <li>Since the main focus of the interview is rails, most of the effort is on the backend.</li>
                        <li>There is a minor bug switch pages(requires double click)</li>
                        <li>The backend queries the twitter api every 20 minutes for new tweets on each topic</li>
                        <li>The api was limited to 50 tweets on each query and topic because api quota limits, could be
                            increased
                        </li>
                        <li>Front-end is on react (create-react-app) and bootstrap, and the backend is on rails 5
                            --api
                        </li>
                        <li>Some gems used: Sidekiq, sidekiq-scheduler, redis, twitter,
                            will_paginate,api-pagination,rack-cors
                        </li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
)