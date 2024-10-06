fetch('https://api.astronomyapi.com/api/v2/bodies/positionshttps://api.astronomyapi.com/api/v2/bodies/positions?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2024-10-06&to_date=2024-10-06&time=10%3A46%3A11', {
    headers: {
        'Authorization': 'Basic NWFmMGRiMTQtNmY5YS00NmM3LTk5NzQtZGE2NTQ1OGJjZjVhOjNhZGU5OGZkMWI3MmQwZDdjMjI0N2NhYjhiMWUzZmVmZjA4ZThmY2QxYTBmY2UzN2M5ZjhmY2Q0N2I5ZDMzMjQ0YTRkYmIwYzBjZmU3NmJlY2NlNjcxYjllOTk0Mzg3MzBhOGJiZmMxNTgwMDc0MmJhYWJlZjAzYTIyZjIyZGUwYzA3ZWI0ZGQ3ZTJmMmVhNDFiNDA3MDE2Nzc5NTliODc0MzQ2MjFiYTg5MGE5MzRhYWNlNGI1ZmE4Y2Y3NzA3MjFkZjUzMmVkMDg0ZTY0MTA1ODIzYTE5ODM3Yjc2MGI2',
        'Content-Type': 'application/json'
    }
}).then(res => res.json()).then(res => console.log(res))