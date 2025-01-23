<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $query = $request->input('search');

    $employees = DB::table('employees')
        ->join('dept_emp', 'employees.emp_no', '=', 'dept_emp.emp_no')// รวมตาราง dept_emp และ employees ด้วยคอลัมน์ emp_no
        ->join('departments', 'dept_emp.dept_no', '=', 'departments.dept_no')// รวมตาราง departments ด้วยคอลัมน์ dept_no
        ->where('first_name', 'like', '%' . $query . '%')// ค้นหาจากชื่อ
            ->orWhere('last_name', 'like', '%' . $query . '%')// ค้นหาจากนามสกุล
        ->select('employees.*', 'departments.dept_name')// เลือกเฉพาะคอลัมน์ที่ต้องการ
        ->paginate(10);

    // แปลงเส้นทางรูปภาพเป็น URL เต็ม
    $employees->getCollection()->transform(function ($employee) { // แปลงข้อมูลในคอลเล็กชัน
        $employee->profile_image = $employee->profile_image// แปลงเส้นทางรูปภาพเป็น URL เต็ม
            ? url('storage/' . $employee->profile_image)// ถ้ามีรูปภาพให้แปลงเป็น URL เต็ม
            : null;// ถ้าไม่มีให้เป็นค่าว่าง
        return $employee;// ส่งค่ากลับ
    });

    return Inertia::render('Employees/Index', [
        'employees' => $employees,
        'query' => $query,
    ]);
}


    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = DB::table('departments')->get();// ดึงข้อมูลจากตาราง departments

        return Inertia::render('Employees/Create', [// ส่งข้อมูลไปยังหน้า Create
            'departments' => $departments,// ส่งข้อมูล departments ไปยังหน้า Create
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|string|max:1',
            'hire_date' => 'required|date',
            'dept_no' => 'required|string|max:4',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  // เพิ่มการตรวจสอบไฟล์
        ]);

        // หากมีการอัพโหลดไฟล์รูปภาพ
        $profileImagePath = null;// กำหนดค่าเริ่มต้นเป็นค่าว่าง
        if ($request->hasFile('profile_image')) {// ตรวจสอบว่ามีการอัพโหลดไฟล์รูปภาพหรือไม่
            $profileImagePath = $request->file('profile_image')->store('profile_images', 'public'); // อัพโหลดไฟล์ไปยังโฟลเดอร์ public/profile_images
        }

        DB::transaction(function () use ($validated, $profileImagePath) {// ใช้การทำงานแบบ transaction สำหรับการบันทึกข้อมูล
            $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0; // หาเลขพนักงานล่าสุด
            $newEmpNo = $latestEmpNo + 1;// กำหนดเลขพนักงานใหม่

            DB::table('employees')->insert([
                'emp_no' => $newEmpNo,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'birth_date' => $validated['birth_date'],
                'gender' => $validated['gender'],
                'hire_date' => $validated['hire_date'],
                'profile_image' => $profileImagePath,  // บันทึกเส้นทางไฟล์ในฐานข้อมูล
            ]);

            DB::table('dept_emp')->insert([
                'emp_no' => $newEmpNo,// บันทึกเลขพนักงานใหม่
                'dept_no' => $validated['dept_no'],// บันทึกเลขแผนก
                'from_date' => $validated['hire_date'],// บันทึกวันที่เริ่มงาน
                'to_date' => '9999-01-01', // Assuming the employee is currently employed
            ]);
        });

        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');// ส่งกลับไปยังหน้า index พร้อมกับข้อความแจ้งเตือน
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)// รับค่าพารามิเตอร์ employee จาก URL
{
    // แปลงเส้นทางรูปภาพเป็น URL เต็ม
    $employee->profile_image = $employee->profile_image//
        ? url('storage/' . $employee->profile_image)// ถ้ามีรูปภาพให้แปลงเป็น URL เต็ม
        : null;

    return Inertia::render('Employees/Show', [
        'employee' => $employee,
    ]);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
